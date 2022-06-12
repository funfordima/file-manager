import { stat, unlink } from 'fs/promises';
import { existsSync } from 'fs';

import { validateAbsolutePath } from '../utils/validate-absolute-path.util.js';

export const remove = async (sourceDir, pathList) => {
  const sourcePath = validateAbsolutePath(sourceDir, ...pathList);

  try {
    const isSourceFileExists = existsSync(sourcePath);
    const isSourceAFile = isSourceFileExists && (await stat(sourcePath)).isFile();

    if (!isSourceFileExists) {
      process.stdout.write('Operation failed\r\n');
      return;
    }

    if (!isSourceAFile) {
      process.stdout.write('Invalid input\r\n');
      return;
    }

    await unlink(sourcePath);
  } catch (err) {
    process.stdout.write('Operation failed\r\n');
  }
};
