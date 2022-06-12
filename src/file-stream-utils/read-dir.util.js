import path from 'path';
import { readdir } from 'fs/promises';

export const readDir = async (sourceDir) => {
  const sourcePath = path.resolve(sourceDir);
  const files = await readdir(sourcePath);

  files.forEach((file) => {
    process.stdout.write(`${file}\r\n`);
  });
};
