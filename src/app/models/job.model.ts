export interface Job {
    id?: string;                // Firestore document ID (jobId)
    title: string;              // Job title
    shortDesc: string;        // Job description/details
    description: string;        // Job description/details
    status: 'open' | 'closed' | 'onhold'; // Job status
    createdAt?: any;            // Firestore Timestamp
    updatedAt?: any;            // Firestore Timestamp
    postedBy: string;           // UID of user (ref to /users/{userId})
    postedByName?: string;      // User’s username (copied from users.username)
    postedByPhoto?: string;     // User’s profile image (copied from users.photoURL)
    rewardOffered?: number;     // Reward or credit offered for job
    rating?: string;
}
