import { Injectable, signal } from '@angular/core';
import { Firestore, collection, doc, getDoc, getDocs, setDoc, addDoc, query, limit, serverTimestamp, collectionData, onSnapshot, QuerySnapshot, DocumentData, docData, where, collectionSnapshots } from '@angular/fire/firestore';
import { Auth, signInAnonymously, onAuthStateChanged, User, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Observable, from, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Job } from '../models/job.model';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { AppUser, UserService } from './user.service';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private currentUser: User | null = null;
  private useFirebaseAuth = true; // 🔄 toggle this to false for local mode
  user = signal<User | { email: string } | null>(null);
  appUser: AppUser | null = null;


  constructor(private CommonService: CommonService, private firestore: Firestore, private auth: Auth, private storage: Storage, private userService: UserService) {

    if (this.CommonService.isBrowser()) {
      const cachedUser = localStorage.getItem('app_user');
      if (cachedUser) {
        this.user.set(JSON.parse(cachedUser));
      }
    }
    // 🔹 Keep track of auth state
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser = user;
      console.log('[Auth] Current user:', user?.uid);
    });
    this.userService.user$.subscribe(u => this.appUser = u);
  }

  // ===============================
  // 🔹 LOGIN / USER CREATION
  // ===============================
  async loginWithUsername(username: string) {
    const usernameRef = doc(this.firestore, 'usernames', username);
    const usernameSnap = await getDoc(usernameRef);

    if (usernameSnap.exists()) {
      // Existing username → sign in anonymously (new session)
      const existing = usernameSnap.data();
      console.log('Username exists, linked UID:', existing['uid']);
      await signInAnonymously(this.auth);
      return existing;
    } else {
      // Create new anonymous user
      const cred = await signInAnonymously(this.auth);
      const uid = cred.user.uid;

      // Write to both collections
      await setDoc(usernameRef, {
        uid,
        createdAt: serverTimestamp(),
      });

      await setDoc(doc(this.firestore, 'users', uid), {
        displayName: username,
        createdAt: serverTimestamp(),
      });

      console.log(`✅ New username "${username}" created for UID:`, uid);
      return { uid, username };
    }
  }

  async login(email: string, password: string) {
    if (this.useFirebaseAuth) {
      const res = await signInWithEmailAndPassword(this.auth, email, password);
      this.user.set(res.user);
      this.userService.setUser({ mode: 'user', userId: email, username: email });
    } else {
      // 🔹 Local mock authentication
      if (email === 'user@test.com' && password === '123456') {
        this.user.set({ email });
        this.userService.setUser({ mode: 'user', userId: email, username: email });

      } else {
        throw new Error('Invalid local credentials');
      }
    }
  }

  async logout() {
    if (this.useFirebaseAuth) {
      await signOut(this.auth);
    }
    this.user.set(null);
    this.userService.clearUser();

  }

  get isLoggedIn() {
    return this.user() !== null;
  }

  // ===============================
  // 🔹 JOB CRUD
  // ===============================
  // async getJobs(limitCount: number = 20) {
  //   const jobsQuery = query(collection(this.firestore, 'jobs'), limit(limitCount));
  //   const snapshot = await getDocs(jobsQuery);
  //   return snapshot.docs.map((doc) => ({
  //     id: doc.id,
  //     ...doc.data(),
  //   }));
  // }

  getJobs(): Observable<Job[]> {
    const jobsCollection = collection(this.firestore, 'jobs');

    return new Observable<Job[]>(subscriber => {
      const unsubscribe = onSnapshot(
        jobsCollection,
        (snapshot: QuerySnapshot<DocumentData>) => {
          const jobs: Job[] = snapshot.docs.map(doc => ({
            id: doc.id,        // Firestore document ID
            ...doc.data() as Job, // Spread fields into Job model
          }));
          subscriber.next(jobs);
        },
        error => subscriber.error(error)
      );

      // Cleanup on unsubscribe
      return () => unsubscribe();
    });
  }

  async getJobById(jobId: string): Promise<any | null> {
    const jobDocRef = doc(this.firestore, `jobs/${jobId}`);
    const snapshot = await getDoc(jobDocRef);

    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() };
    } else {
      return null; // No document found
    }
  }

  async getFirstJobContact() {
    const snapshot = await getDocs(query(collection(this.firestore, 'jobs'), limit(1)));
    if (!snapshot.empty) {
      return snapshot.docs[0].data()['contactPerson'];
    }
    return null;
  }


  // async addJob(job: Job) {
  //   const colRef = collection(this.firestore, 'jobs');
  //   await addDoc(colRef, { id: uuidv4(), title: job.title, shortDesc: job.shortDesc, description: job.description, status: job.status, createdAt: new Date().toISOString(), postedBy: 'user0', rewardOffered: job.rewardOffered, rating: job.rating }
  //   );

  // }

  async addJob(job: Job) {
    const id = uuidv4();

    const jobData = {
      id,
      ...job,
    };

    // 1️⃣ Create main job document
    await setDoc(doc(this.firestore, `jobs/${id}`), jobData);

    // 2️⃣ Create corresponding solutions doc
    await setDoc(doc(this.firestore, `solutions/${id}`), { id });

    // 3️⃣ Add a test document to make subcollection "0" appear
    const subCollectionRef = collection(this.firestore, `solutions/${id}/0`);
    await addDoc(subCollectionRef, {
      test: true,
      message: 'This is a test doc to initialize subcollection 0',
      createdAt: new Date().toISOString(),
    });

    console.log(`Job created with id ${id}, subcollection 0 initialized ✅`);
    return id;
  }

  async addSolutionToJob(jobId: string, solution: any) {
    const jobDocRef = doc(this.firestore, `solutions/${jobId}`);
    const subColRef = collection(jobDocRef, '0');
    const docRef = await addDoc(subColRef, solution);

    return docRef.id;
  }


  // async addJob(job: {
  //   title: string;
  //   shortDesc: string;
  //   contactPerson: string;
  //   contactInfo: string;
  // }) {
  //   if (!this.currentUser) throw new Error('User not logged in');

  //   const jobData = {
  //     ...job,
  //     postedByUid: this.currentUser.uid,
  //     postedByName: this.currentUser.displayName || '(Anonymous)',
  //     createdAt: serverTimestamp(),
  //   };

  //   await addDoc(collection(this.firestore, 'jobs'), jobData);
  //   console.log('✅ Job added:', jobData);
  // }

  // ===============================
  // 🔹 HELPERS
  // ===============================
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  getCurrentUser$(): Observable<User | null> {
    return new Observable((observer) => {
      const unsub = onAuthStateChanged(this.auth, (user) => observer.next(user));
      return () => unsub();
    });
  }

  getSolutionsById(jobId: string): Observable<any[]> {
    const subCollectionRef = collection(this.firestore, `solutions/${jobId}/0`);

    return new Observable<any[]>(subscriber => {
      const unsubscribe = onSnapshot(
        subCollectionRef,
        (snapshot: QuerySnapshot<DocumentData>) => {
          if (snapshot.empty) {
            subscriber.next([]);
            return;
          }

          const solutions = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          subscriber.next(solutions);
        },
        error => subscriber.error(error)
      );

      return () => unsubscribe();
    });
  }


  async uploadImage(file: File, folder: string): Promise<string> {
    const filePath = `${folder}/${Date.now()}_${file.name}`;
    const storageRef = ref(this.storage, filePath);

    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  }
}
