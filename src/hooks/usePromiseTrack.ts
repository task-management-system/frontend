import { useState } from 'react';

function usePromiseTrack<X extends any[], T>(
  promise: (...args: X) => Promise<T>,
  delay = 0
): [boolean, (...args: X) => Promise<T>] {
  const [inProgress, setInProgress] = useState(false);

  const wrapper = (...args: X): Promise<T> =>
    new Promise((resolve, reject) => {
      setInProgress(true);

      return promise(...args)
        .then(resolve)
        .catch(reject)
        .finally(() => {
          setTimeout(() => {
            setInProgress(false);
          }, delay);
        });
    });

  return [inProgress, wrapper];
}

export default usePromiseTrack;
