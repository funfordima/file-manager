const {
  createHash,
} = await import('crypto');
import { createReadStream } from 'fs';

export const checksumFile = (hashName, path) => {
  return new Promise((resolve, reject) => {
    const hash = createHash(hashName);
    const stream = createReadStream(path);
    stream.on('error', err => reject(err));
    stream.on('data', chunk => hash.update(chunk));
    stream.on('end', () => {
      hash.end();
      return resolve(hash.digest('hex'));
    });
  });
}
