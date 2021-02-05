import { useState, useEffect } from 'react';

function useScreenWidthCompare(comparator: (width: number) => boolean) {
  const [value, setValue] = useState(comparator(window.innerWidth));

  const handler = () => setValue(comparator(window.innerWidth));

  useEffect(() => {
    window.addEventListener('resize', handler);

    return () => {
      window.removeEventListener('resize', handler);
    };
  });

  return value;
}

export default useScreenWidthCompare;
