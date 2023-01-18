import { atom } from 'recoil';

const keywordsAtom = atom({
  key: 'keywords',
  default: '',
});

export default keywordsAtom;