import { selector } from 'recoil';
import keywordsAtom from '../keywords/atom';
import articlesAtom, { Article } from './atom'

export interface ExtendedArticle extends Article {
  importance: 'high' | 'low' | 'none';
}

const getFilteredArticles = selector({
  key: 'filteredArticles',
  get: ({ get }) => {
    const keywords = get(keywordsAtom).toLowerCase().split(' ');
    const extendedArticles: ExtendedArticle[] = get(articlesAtom).map(article => {
      return { ...article, importance: 'none' };
    });

    const filteredList = extendedArticles.filter(article => {
      const description = article.description;
      const title = article.title;

      for (let i = 0; i < keywords.length; i++) {
        if (RegExp('\\b'+ keywords[i] +'\\b', 'i').test(description))
          article.importance = 'low';
        if (RegExp('\\b'+ keywords[i] +'\\b', 'i').test(title))
          article.importance = 'high';
        if (article.importance !== 'none') break;
      }
      return (article.importance !== 'none') && true;
    });

    return filteredList.sort((a, b) => {
      let res = 0;
      if (a.importance > b.importance) res = 1;
      if (a.importance < b.importance) res = -1;
      return res;
    });
  },
});

export default getFilteredArticles;
