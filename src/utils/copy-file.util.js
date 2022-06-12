import path from 'path';
import { existsSync } from 'fs';
import { writeFile, readFile } from 'fs/promises';

import { CustomValidationError } from '../errors/custom-validation-error.js';

export const copyFile = async (source, target) => {
  const sourcePath = path.resolve(source);
  const targetPath = path.resolve(target, path.basename(sourcePath));
  const isTargetFileExists = existsSync(targetPath);

  if (isTargetFileExists) {
    throw new CustomValidationError('Operation failed\r\n');
  }

  try {
    const fileToRead = await readFile(sourcePath, { encoding: 'utf-8' });
    await writeFile(targetPath, fileToRead);
  } catch (err) {
    throw err;
  }
};
