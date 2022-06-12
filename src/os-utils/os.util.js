import { EOL, arch, cpus, userInfo } from 'os';

import { EOL_VAR, CPU_VAR, HOME_DIR_VAR, USER_NAME_VAR, ARCHITECTURE_VAR } from '../constants/os.constant.js';

export const operationSystem = (...args) => {
  try {
    switch (true) {
      case args.includes(EOL_VAR): {
        process.stdout.write(`EOL ${EOL}`);
        break;
      }
      case args.includes(CPU_VAR): {
        const cpuData = cpus().map((data) => ({ speed: data.speed, model: data.model, ...data.times }));
        console.table(cpuData);
        break;
      }
      case args.includes(HOME_DIR_VAR): {
        process.stdout.write(`${userInfo().homedir}\r\n`);
        break;
      }
      case args.includes(USER_NAME_VAR): {
        process.stdout.write(`${userInfo().username}\r\n`);
        break;
      }
      case args.includes(ARCHITECTURE_VAR): {
        process.stdout.write(`${arch()}\r\n`);
        break;
      }
      default: {
        process.stdout.write('Invalid input\r\n');
      }
    }
  } catch {
    process.stdout.write('Operation failed\r\n');
  }
};
