import { atom } from 'recoil';

export interface Article {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: {
    id: any,
    name: string,
  };
  title: string;
  url: string;
  urlToImage: string;
}

const articlesAtom = atom<Article[]>({
  key: 'articles',
  default: [],
})

export default articlesAtom;
