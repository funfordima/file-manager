import path from 'path';
import { access, open } from 'fs/promises';

export const create = async (sourceDir, pathList) => {
  const sourcePath = path.join(sourceDir, ...pathList);

  if (!pathList.length) {
    process.stdout.write('Operation failed\r\n');
    return;
  }

  try {
    await access(sourcePath);
    process.stdout.write('Operation failed\r\n');
    return;
  } catch (err) {
    await open(sourcePath, "wx");
  }
};
