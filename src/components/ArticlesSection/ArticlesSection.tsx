import useFetchAPIData, { url } from '../../hooks/useFetchAPIData';
import CircularProgress from '@mui/material/CircularProgress';
import { useRecoilState, useRecoilValue } from 'recoil';
import displayAtom from '../../recoil/display/atom';
import ArticleCard from '../ArticleCard/ArticleCard';

import {
  Article,
  ExtendedArticle,
  articlesAtom,
  getFilteredArticles
} from '../../recoil/articles/index';
import './ArticlesSection.scss'

const ArticlesSection = () => {
  const [articles, setArticles] = useRecoilState(articlesAtom);
  const filteredArticles = useRecoilValue(getFilteredArticles);
  const display = useRecoilValue(displayAtom);
  const { error, loading } = useFetchAPIData(url, setArticles);
  const results = (display === 'cards') ? articles.length : filteredArticles.length;

  function getCards(articles: Article[] | ExtendedArticle[]) {
    const cards = articles.map(card => {
      const cardKey = card.title + card.publishedAt;
      return <ArticleCard key={cardKey} {...card} />;
    });

    return (cards.length > 0) ? cards : <h2>nothing found</h2>;
  }

  return (
    <main className='articlesSection'>
      <div className='results'>
        <p><b>Results: {results}</b></p>
      </div>
      <div className='cards'>
        {
          loading ? <CircularProgress color='success' size='5rem' />
            : error ? <h2>something has happened, {error.message}</h2>
              : (display === 'cards') ? getCards(articles)
                : getCards(filteredArticles)
        }
      </div>
    </main>
  );
}

export default ArticlesSection;
