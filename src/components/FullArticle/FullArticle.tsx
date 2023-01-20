import { useLocation, Link } from 'react-router-dom';
import WestIcon from '@mui/icons-material/West';
import './FullArticle.scss';

const FullArticle = () => {
  const { state: {
    title,
    description,
    urlToImage
  } } = useLocation();
  const descWithoutAnchors = description.replace(/<a\b[^>]*>(.*?)<\/a>/gi, "");

  return (
    <article className='fullArticle'>
      <div className='articlePicture'>
        <img
          src={urlToImage}
          alt='full-size article pic'>
        </img>
      </div>
      <div className='articleContent'>
        <h1>{title}</h1>
        <div className='articleText'>
          <p>{descWithoutAnchors.repeat(5)}</p>
          <p>{descWithoutAnchors.repeat(5)}</p>
          <p>{descWithoutAnchors.repeat(5)}</p>
        </div>
        <Link to='/'>
          <div className='linkText'>
            {<WestIcon />}
            <b>Back to homepage</b>
          </div>
        </Link>
      </div>
    </article>
  );
};

export default FullArticle;
