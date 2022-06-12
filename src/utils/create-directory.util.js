import { mkdir } from 'fs/promises';

export const createDirectory = async (target) => {
  try {
    await mkdir(target);
  } catch (err) {
    throw err;
  }
};
