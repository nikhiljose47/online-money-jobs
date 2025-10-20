export interface Solution {
  id?: string;                // Firestore document ID (userId)
  username: string;           // Display name chosen by user
  linkedToId: string;              // User’s email
  photoURL?: string;          // Profile picture URL
  createdAt?: any;            // Firestore Timestamp
  solnText: string;
}
