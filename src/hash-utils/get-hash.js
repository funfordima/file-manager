import { existsSync } from 'fs';
import { stat } from 'fs/promises';

import { validateAbsolutePath } from '../utils/validate-absolute-path.util.js';
import { checksumFile } from '../utils/check-file-sum.util.js';

export const getHash = async (sourceDir, pathList) => {
  const sourcePath = validateAbsolutePath(sourceDir, ...pathList);

  try {
    const isSourceFileExists = existsSync(sourcePath);
    const isSourceAFile = isSourceFileExists && (await stat(sourcePath)).isFile();

    if (!isSourceAFile) {
      process.stdout.write('Invalid input\r\n');
      return;
    }

    const res = await checksumFile('sha256', sourcePath);
    process.stdout.write(`${res}\r\n`);
  } catch (err) {
    process.stdout.write('Operation failed\r\n');
  }
};
