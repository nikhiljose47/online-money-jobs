import { Injectable } from '@angular/core';
import imageCompression from 'browser-image-compression';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() {}

   async compressImage(file: File): Promise<File> {
    const options = {
      maxSizeMB: 0.5,            // Target maximum size (in MB)
      maxWidthOrHeight: 1080,  // Resize to this width/height if larger
      useWebWorker: true       // Better performance
    };

    try {
      const compressedFile = await imageCompression(file, options);
      console.log('Original size:', (file.size / 1024 / 1024).toFixed(2) + ' MB');
      console.log('Compressed size:', (compressedFile.size / 1024 / 1024).toFixed(2) + ' MB');
      return compressedFile;
    } catch (error) {
      console.error('Compression failed:', error);
      throw error;
    }
  }
    isBrowser(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }
}
