import { copy } from './copy.util.js';
import { remove } from './remove.utils.js';

import { validateAbsolutePath } from '../utils/validate-absolute-path.util.js';

export const move = async (sourceDir, args) => {
  await copy(sourceDir, args);

  const sourcePath = validateAbsolutePath(sourceDir, ...args.slice(0, -1));

  await remove(sourceDir, [sourcePath]);
};
