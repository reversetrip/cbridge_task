import FilterByKeywords from './components/FilterByKeywords/FilterByKeywords'
import ArticlesSection from './components/ArticlesSection/ArticlesSection';
import FullArticle from './components/FullArticle/FullArticle';
import { RecoilRoot } from 'recoil';
import { Route, Routes } from 'react-router-dom';
import './App.scss';

function App() {
  const homeRoute = <div>
    <FilterByKeywords />
    <ArticlesSection />
  </div>;

  const notFound = <h2 className='notFound'>the path not found</h2>;

  return (
    <>
      <div className='container'>
        <RecoilRoot>
          <Routes>
            <Route path='/cbridge_task' element={homeRoute} />
            <Route path='/cbridge_task/article/:title' element={<FullArticle />} />
            {/* <Route path='/cbridge_task/*' element={notFound} /> */}
          </Routes>
        </RecoilRoot>
      </div>
    </>
  );
}

export default App;
