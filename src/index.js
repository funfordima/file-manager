import readline from 'readline';

import { commandList } from './constants/command-list.js';
import { FileManager } from './file-manager/file-manager.js';
import { validateInput } from './utils/validate-input.js';
import { getHomeDir } from './utils/get-home-dir.js';
import { getUserName } from './utils/get-user-name.util.js';

const initApp = () => {
  const initialArgs = process.argv.slice(2);
  const homeDir = getHomeDir();
  process.chdir(homeDir);

  const useName = getUserName(initialArgs);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question(`Welcome to the File Manager, ${useName}!\r\nYou are currently in ${homeDir}\r\n`, (input) => {
    const { method, params } = validateInput(input, commandList);

    if (method === '.exit') {
      rl.close();
      return;
    }

    new FileManager(homeDir)[method](...params);
  });

  rl.on('line', (input) => {
    const { method, params } = validateInput(input, commandList);

    if (method === '.exit') {
      rl.close();
      return;
    }

    new FileManager()[method](...params)
  });

  rl.on('SIGINT', () => rl.close())

  rl.on('close', () => {
    process.stdout.write(`Thank you for using File Manager, ${useName}!`);
    process.exit(0);
  });
};

initApp();
