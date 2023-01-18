import { atom } from 'recoil';

type Mode = 'cards' | 'cardsFiltered';

const displayAtom = atom<Mode>({
  key: 'display',
  default: 'cards',
});

export default displayAtom;