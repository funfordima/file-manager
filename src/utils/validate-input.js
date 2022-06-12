export const validateInput = (input, commandList) => {
  const [method, ...params] = input.split(' ');

  const isValidInput = commandList.includes(method);

  if (!isValidInput) {
    process.stdout.write('Invalid input\r\n');
    return { method: 'cd', params: [] };
  }

  return { method, params };
};
