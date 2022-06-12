import path from 'path';
import { existsSync } from 'fs';
import { rename as renamePromise } from 'fs/promises';


export const rename = async (sourceDir, args) => {
  const pathList = args.slice(0, -1);
  const targetSource = args.slice(-1);

  const sourcePath = path.resolve(sourceDir, ...pathList);
  const targetPath = path.resolve(sourcePath, '..', ...targetSource);

  try {
    const isSourceFileExist = existsSync(sourcePath);

    if (!isSourceFileExist) {
      process.stdout.write('Invalid input\r\n');
      return;
    }

    await renamePromise(sourcePath, targetPath);
  } catch {
    process.stdout.write('Operation failed\r\n');
  }
};
