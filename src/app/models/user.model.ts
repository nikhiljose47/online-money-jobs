export interface User {
  id?: string;                // Firestore document ID (userId)
  username: string;           // Display name chosen by user
  email: string;              // User’s email
  photoURL?: string;          // Profile picture URL
  rewardPoints?: number;      // Reward or points earned
  karma?: number;             // Karma level
  wallet?: number;            // Wallet balance or coins
  createdAt?: any;            // Firestore Timestamp
  lastLogin?: any;            // Firestore Timestamp
}
