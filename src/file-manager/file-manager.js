import path from 'path';

import {
  cat,
  create,
  copy,
  move,
  readDir,
  rename,
  remove,
} from '../file-stream-utils/index.js';
import { log } from '../utils/log.util.js';
import { operationSystem } from '../os-utils/os.util.js';
import { getHash } from '../hash-utils/get-hash.js';
import { compress } from '../zip-utils/compress.util.js';
import { decompress } from '../zip-utils/decompress.util.js';

export class FileManager {
  constructor(directory) {
    this.baseDir = directory;

    if (!FileManager.instance) {
      FileManager.instance = this;
    }
    return FileManager.instance;
  }

  up() {
    const newPath = path.join(this.baseDir, '..');
    this.baseDir = newPath;
    process.chdir(newPath);
    log();
  }

  cd(...pathList) {
    const newPath = path.join(this.baseDir, ...pathList);

    try {
      process.chdir(newPath);
      this.baseDir = newPath;
      log();
    } catch (err) {
      process.stdout.write('Operation failed\r\n');
      log();
    }
  }

  async ls() {
    await readDir(this.baseDir);
    log();
  }

  async cat(...pathList) {
    await cat(this.baseDir, pathList);
    log();
  }

  async add(...pathList) {
    await create(this.baseDir, pathList);
    log();
  }

  async rn(...args) {
    await rename(this.baseDir, args);
    log();
  }

  async cp(...args) {
    await copy(this.baseDir, args);
    log();
  }

  async rm(...args) {
    await remove(this.baseDir, args);
    log();
  }

  async mv(...args) {
    await move(this.baseDir, args);
    log();
  }

  os(...args) {
    operationSystem(...args);
    log();
  }

  async hash(...args) {
    await getHash(this.baseDir, args);
    log();
  }

  async compress(...args) {
    await compress(this.baseDir, args);
    log();
  }

  async decompress(...args) {
    await decompress(this.baseDir, args);
    log();
  }
}
