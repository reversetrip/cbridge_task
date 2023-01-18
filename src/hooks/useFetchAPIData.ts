import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { SetterOrUpdater } from 'recoil';
import { Article } from '../recoil/articles/index';

const link = 'https://newsapi.org/v2/everything?';
const params = 'q=technologies&language=en&from=2023-01-14&sortBy=popularity&apiKey=';
const apiKey = '6a6959e75d184ad6b8902b36f5e33b54';
export const url = link + params + apiKey;

export type TApiResponse = {
  error: any;
  loading: boolean;
};

// Dull custom hook that fetches API data
// then writes it to an atom (alias for a piece of global state in recoil library)
function useFetchAPIData(url: string, setArticles: SetterOrUpdater<Article[]>): TApiResponse {
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getData() {
      try {
        const apiResponse: AxiosResponse = await axios.get(url);
        setArticles(apiResponse.data.articles.slice(1));
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    getData();

  }, [url, setArticles]);

  return { error, loading };
};

export default useFetchAPIData;
