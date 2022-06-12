import path from 'path';

export const validateAbsolutePath = (sourceDir, ...targetSourceList) => {
  const targetPath = path.resolve(...targetSourceList);

  if (path.isAbsolute(targetPath)) {
    return targetPath;
  }

  return path.resolve(sourceDir, ...targetSource);
};
