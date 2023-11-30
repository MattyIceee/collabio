import { useEffect } from 'react';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { backgroundAtom } from './background.atom';

export const useBackground = () => {
  const bg = useRecoilValue(backgroundAtom);

  useEffect(() => {
    const root = window.document.documentElement;

    if (bg.mode === 'customs') {
      root.classList.remove('factory');
      root.classList.remove('interchange');
      root.classList.add('customs');
    } else if(bg.mode === 'factory') {
      root.classList.remove('customs');
      root.classList.remove('interchange');
      root.classList.add('factory');
    }
    else {
      root.classList.remove('customs');
      root.classList.remove('factory');
      root.classList.add('interchange');
    }
  }, [bg.mode]);

  return bg;
};

export const useSetBackground = () => {
  const setBg = useSetRecoilState(backgroundAtom);

  const setBackground = (mode: 'factory' | 'customs' | 'interchange', lines: boolean) => {
    setBg({
      mode,
      lines,
    });
  };

  return setBackground;
};
