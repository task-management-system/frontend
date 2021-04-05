import { noop } from 'utils';

const createURL = (data: Blob): [string, () => void] => {
  const url = URL.createObjectURL(data);

  return [url, () => URL.revokeObjectURL(url)];
};

const download = (name: string, data: Blob | string) => {
  const link = document.createElement('a');
  const [url, revokeUrl] = typeof data !== 'string' ? createURL(data) : [data, noop];

  link.href = url;
  link.download = name;

  link.addEventListener('click', () => {
    setTimeout(revokeUrl);
  });

  link.click();
};

export default download;
