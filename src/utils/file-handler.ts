import { promises as fs } from 'fs';

export default class File {
  // create a new directory if it doesn't exists
  static createDirectory = async (filePath: string): Promise<void> => {
    try {
      // check if directory exists
      await fs.access(filePath);
    } catch {
      // create directory
      fs.mkdir(filePath);
    }
  };

  // check for cached image
  static isImageFound = async (filePath: string): Promise<boolean> => {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  };
}
