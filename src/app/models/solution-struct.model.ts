export interface SolutionStruct {
  id?: string;                // Firestore document ID (userId)
  imageCount: number;
  textLen: number;
  textContainsWords: string[];
}
