import path from 'path';
import { access, readFile } from 'fs/promises';

export const cat = async (sourceDir, pathList) => {
  const sourcePath = path.join(sourceDir, ...pathList);

  if (!pathList.length) {
    process.stdout.write('Operation failed\r\n');
    return;
  }

  try {
    await access(sourcePath);

    const file = await readFile(sourcePath);

    process.stdout.write(`${file}\r\n`);
  } catch {
    process.stdout.write('Operation failed\r\n');
  }
};
