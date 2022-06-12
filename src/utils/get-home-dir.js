import { userInfo } from 'os';

export const getHomeDir = () => {
  return userInfo().homedir;
};
