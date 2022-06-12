import path from 'path';
import { stat } from 'fs/promises';
import { createReadStream, createWriteStream, existsSync } from 'fs';
import { pipeline } from 'stream';
import { createBrotliCompress } from 'zlib';

import { createDirectory } from '../utils/create-directory.util.js';
import { validateAbsolutePath } from '../utils/validate-absolute-path.util.js';

export const compress = async (sourceDir, args) => {
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

    const pathToDestinationFile = path.resolve(targetPath, path.basename(sourcePath));
    const isTargetFileExists = existsSync(pathToDestinationFile);

    if (isTargetFileExists) {
      process.stdout.write('Operation failed\r\n');
    }

    const readStream = createReadStream(sourcePath);
    const writeStream = createWriteStream(pathToDestinationFile);
    const brotli = createBrotliCompress();

    pipeline(
      readStream,
      brotli,
      writeStream,
      (err) => {
        if (err) {
          process.stdout.write('Operation failed\r\n');
        }
      });

  } catch {
    process.stdout.write('Operation failed\r\n');
  }
};
