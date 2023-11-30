import { atom } from 'recoil';

export const backgroundAtom = atom<{ mode: 'factory' | 'customs' | 'interchange'; lines: boolean }>({
  key: 'bg',
  default: {
    mode: 'customs',
    lines: false,
  },
});
