import { Article, ExtendedArticle } from '../../recoil/articles/index';
import { useRecoilState } from 'recoil';
import keywordsAtom from '../../recoil/keywords/atom';
import displayAtom from '../../recoil/display/atom';
import { Link } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EastIcon from '@mui/icons-material/East';
import './ArticleCard.scss';

const ArticleCard = (props: Article | ExtendedArticle) => {
  const {
    urlToImage: image,
    title
  } = props;

  const [display, setDisplay] = useRecoilState(displayAtom);
  const [keywords, setKeywords] = useRecoilState(keywordsAtom);
  let description = props.description.replace(/<a\b[^>]*>(.*?)<\/a>/gi, ""); // removing anchor tags

  function getDate() {
    const date = new Date(props.publishedAt);
    const year = date.getFullYear();
    const month = date.toLocaleString('en', { month: 'long' });
    const day = date.getDate();

    return `${month} ${day}th, ${year}`;
  }

  function getCardContent() {
    let content: JSX.Element[] = [<p></p>];

    if (display === 'cards') {
      content[0] = <h3 className='cardTitle'>{title}</h3>;
      content[1] = <span className='cardDescription'>
        {(description.length > 100) ? description.slice(0, 98) + '...' : description}
      </span>;
    } else {
      content[0] = <h3 className='cardTitle'>
        {highlightWords(title, keywords)}
      </h3>;
      content[1] = <span className='cardDescription'>{highlightWords(description, keywords)}</span>;
    }

    return content;
  }

  function getRoute() {
    let route = title.toLowerCase().trim().replaceAll(' ', '-');
    const specialChars: string = '!@#$^&%*()+=[]{}|:<>?,.';
    for (let i = 0; i < specialChars.length; i++) {
      route = route.replace(new RegExp('\\' + specialChars[i], 'gi'), '');
    }

    return route;
  }

  function handleLink() {
    setKeywords('');
    setDisplay('cards');
  }

  return (
    <div className='card'>
      <div className='cardImg'>
        <img
          src={image}
          alt='tech related pic'
          width='300px'
          height='150px'>
        </img>
      </div>
      <div className='cardContent'>
        <div className='cardDate'>
          <CalendarMonthIcon />
          <span>{getDate()}</span>
        </div>
        <div className='cardTitle'>
          {getCardContent()[0]}
        </div>
        <div className='cardDescription'>
          {getCardContent()[1]}
        </div>
        <Link
          to={`cbridge_task/article/${getRoute()}`}
          state={props}
          onClick={handleLink}>
          <div className='linkText'>
            <b>Read more</b>
            {<EastIcon />}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;

function highlightWords(text: string, keywords: string) {
  const splittedKeys = keywords.toLowerCase().split(' ');
  const regex = splittedKeys.reduce((res, word, i) => {
    if (i === keywords.length - 1) return res + `(${'\\b' + word + '\\b'})`;
    return res + `(${'\\b' + word + '\\b'})|`;
  }, '');

  const pieces = text.split(new RegExp(regex, 'gi')).filter(el => el);
  const bgYellow = { background: 'rgba(255, 240, 0, 1)' };

  return <span>
    {
      pieces.map((piece, i) => {
        return (
          <span key={i}
            style={splittedKeys.includes(piece.toLowerCase()) ? bgYellow : {}} >
            {piece}
          </span>
        )
      })
    }
  </span>;
}
