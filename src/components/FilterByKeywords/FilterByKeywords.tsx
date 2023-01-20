import React, { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import keywordsAtom from '../../recoil/keywords/atom';
import displayAtom from '../../recoil/display/atom';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './FilterByKeywords.scss'

const FilterByKeywords = () => {
  const [input, setInput] = useState('');
  const setKeywords = useSetRecoilState(keywordsAtom);
  const [display, setDisplay] = useRecoilState(displayAtom);

  function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  function onInputEnter(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Enter') filterArticles();
  }

  function filterArticles() {
    const trimmed = input.trim();
    if (trimmed !== '') {
      setKeywords(trimmed);
      setDisplay('cardsFiltered');
    } else {
      setInput('');
    }
  }

  function cleanFilter() {
    setKeywords('');
    setInput('');
    setDisplay('cards');
  }

  return (
    <div className='filterSection'>
      <TextField
        name='filter'
        color='primary'
        variant='outlined'
        size='medium'
        sx={{ width: '500px' }}
        label='Filter by keywords'
        value={input}
        onChange={inputHandler}
        onKeyUp={onInputEnter}
        InputProps={{
          startAdornment: <SearchIcon />
        }}
      />
      <Button
        color='success'
        variant='contained'
        size='small'
        onClick={(display === 'cards') ? filterArticles : cleanFilter}>
        {(display === 'cards') ? 'filter' : 'clean'}
      </Button>
    </div>
  )
};

export default FilterByKeywords;
