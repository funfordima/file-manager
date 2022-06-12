import { stat } from 'fs/promises';
import { existsSync } from 'fs';

import { createDirectory } from '../utils/create-directory.util.js';
import { copyFile } from '../utils/copy-file.util.js';
import { validateAbsolutePath } from '../utils/validate-absolute-path.util.js';

export const copy = async (sourceDir, args) => {
  const pathList = args.slice(0, -1);
  const targetSource = args.slice(-1);

  const sourcePath = validateAbsolutePath(sourceDir, ...pathList);
  const targetPath = validateAbsolutePath(sourceDir, ...targetSource);

  try {
    const isSourceFileExists = existsSync(sourcePath);
    const isTargetDirectoryExists = existsSync(targetPath);
    const isSourceAFile = isSourceFileExists && (await stat(sourcePath)).isFile();
    const isTargetADirectory = isTargetDirectoryExists && (await stat(targetPath)).isDirectory();

    if (!isSourceAFile) {
      process.stdout.write('Invalid input\r\n');
      return;
    } else if (!isTargetADirectory) {
      await createDirectory(targetPath);
    }

    await copyFile(sourcePath, targetPath);
  } catch {
    process.stdout.write('Operation failed\r\n');
  }
};
