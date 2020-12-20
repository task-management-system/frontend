import localForage from 'localforage';

export const getToken = async () => {
  const token = await localForage.getItem('token');

  return token;
};
