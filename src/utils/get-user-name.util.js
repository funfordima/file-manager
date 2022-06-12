export const getUserName = (args) => {
  const entryString = '--username';
  const userName = args.find((arg) => arg.includes(entryString))?.split('=')?.[1];

  if (!userName) {
    process.stdout.write('Invalid input\r\n');
  }

  return userName;
};
