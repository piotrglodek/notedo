import React from 'react';
// icons
import { ReactComponent as HeartIconFilledSvg } from '../../assets/icons/favorite-filed_icon.svg';
import { ReactComponent as HeartIconBorderSvg } from '../../assets/icons/favorite_icon.svg';
// redux
import { useDispatch } from 'react-redux';
import { noteDeleted, noteStarred } from '../features/notesSlice';
// react-router-dom
import { Link } from 'react-router-dom';

export const Note = (props) => {
  const { id, noteTitle, noteText, isFavorite } = props.data;
  const dispatch = useDispatch();
  const deleteNote = (noteId) => {
    dispatch(noteDeleted(noteId));
  };
  const toggleFavorite = (noteId) => {
    dispatch(noteStarred(noteId));
  };

  return (
    <div className='note'>
      <div className='note__container'>
        <h5 className='note__title'>
          {noteTitle.substring(0, 16)}
          {noteTitle.length >= 20 ? '...' : null}
        </h5>
        <p className='note__text'>
          {noteText.substring(0, 100)}
          {noteText.length >= 80 ? '...' : null}
        </p>
        <div>
          <button
            onClick={() => deleteNote(id)}
            className='note__btn btn btn--small btn--outlined'
          >
            Delete
          </button>
          <Link
            to={`/notedo/note/${id}`}
            className='note__btn btn btn--small btn--filled'
          >
            Visit
          </Link>
          <button onClick={() => toggleFavorite(id)} className='note__favorite'>
            {isFavorite ? <HeartIconFilledSvg /> : <HeartIconBorderSvg />}
          </button>
        </div>
      </div>
    </div>
  );
};
