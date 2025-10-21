import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDoc, getDocs, setDoc, addDoc, query, limit, serverTimestamp, collectionData, onSnapshot, QuerySnapshot, DocumentData, docData, where, collectionSnapshots } from '@angular/fire/firestore';
import { Auth, signInAnonymously, onAuthStateChanged, User } from '@angular/fire/auth';
import { Observable, from, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Job } from '../models/job.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private currentUser: User | null = null;

  constructor(private firestore: Firestore, private auth: Auth) {
    // 🔹 Keep track of auth state
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser = user;
      console.log('[Auth] Current user:', user?.uid);
    });
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

  getJobs(): Observable<any[]> {
    const jobsCollection = collection(this.firestore, 'jobs');

    return new Observable<any[]>(subscriber => {
      const unsubscribe = onSnapshot(jobsCollection, (snapshot: QuerySnapshot<DocumentData>) => {
        const jobs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        subscriber.next(jobs);
      }, error => subscriber.error(error));

      // Cleanup on unsubscribe
      return { unsubscribe };
    });
  }

  async getFirstJobContact() {
    const snapshot = await getDocs(query(collection(this.firestore, 'jobs'), limit(1)));
    if (!snapshot.empty) {
      return snapshot.docs[0].data()['contactPerson'];
    }
    return null;
  }


  async addJob(job: Job) {
    const colRef = collection(this.firestore, 'jobs');
    await addDoc(colRef, { id: job.id, title: job.title, shortDesc: job.shortDesc, description: job.description, status: job.status, createdAt: new Date().toISOString(), postedBy: 'user0', rewardOffered: job.rewardOffered, rating: job.rating }
    );
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
          const solutions = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          subscriber.next(solutions);
        },
        error => subscriber.error(error)
      );

      // Cleanup listener when unsubscribed
      return { unsubscribe };
    });
  }

  // Example function to add solution
  async addSolution(jobId: string, userId: string, text: string) {
    const solRef = collection(this.firestore, 'solutions');
    await addDoc(solRef, {
      jobId,
      userId,
      text,
      verified: false,
      createdAt: new Date()
    });
  }
}
