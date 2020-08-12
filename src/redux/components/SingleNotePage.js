import React, { useState } from 'react';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { noteDeleted, noteEdited } from '../features/notesSlice';
// react-router-dom
import { Link, Redirect, useHistory } from 'react-router-dom';
// icons
import { ReactComponent as GoBackIconSvg } from '../../assets/icons/arrow-back_icon.svg';

export const SingleNotePage = (props) => {
  const dispatch = useDispatch();
  let history = useHistory();

  const { noteId } = props.match.params;
  const note = useSelector((state) =>
    state.notes.find((note) => note.id === noteId)
  );

  const { noteTitle, noteText } = note;
  // note action
  const handleDelete = (id) => {
    dispatch(noteDeleted(id));
    history.push('/notedo');
  };
  // edit form
  const [isEdited, setIsEdited] = useState(false);
  const handleEdit = () => {
    setIsEdited(!isEdited);
  };

  const [updatedNoteTitle, setupdatedNoteTitle] = useState(noteTitle);
  const [updatedNoteText, setupdatedNoteText] = useState(noteText);

  const handleTitle = (e) => setupdatedNoteTitle(e.target.value);
  const handleText = (e) => setupdatedNoteText(e.target.value);

  const handleUpdateNote = () => {
    if (updatedNoteTitle && updatedNoteText) {
      dispatch(noteEdited({ id: noteId, updatedNoteTitle, updatedNoteText }));
      setIsEdited(!isEdited);
      history.push(`/notedo/note/${noteId}`);
    }
  };

  if (!note) {
    return <Redirect to='/notedo' />;
  } else {
    return (
      <div className='single-note'>
        <Link
          onClick={handleEdit}
          className='single-note__link'
          to={`${isEdited ? `/notedo/note/${noteId}` : '/notedo'}`}
        >
          <GoBackIconSvg />
        </Link>

        {isEdited ? (
          <div className='form__container'>
            <label htmlFor='noteTitle' className='form__label'>
              <input
                type='text'
                id='noteTitle'
                className='form__input'
                required
                value={updatedNoteTitle}
                onChange={handleTitle}
              />
            </label>
            <label htmlFor='noteText' className='form__label'>
              <textarea
                type='text'
                id='noteText'
                className='form__input form__input-textarea'
                required
                value={updatedNoteText}
                onChange={handleText}
              />
            </label>
            <button
              onClick={handleUpdateNote}
              className='form__submit btn btn--small btn--filled'
            >
              Save note
            </button>
          </div>
        ) : (
          <>
            <h2 className='single-note__title'>{noteTitle}</h2>
            <p className='single-note__text'>{noteText}</p>
            <div>
              <button
                onClick={() => handleDelete(noteId)}
                className='note__btn btn btn--small btn--outlined'
              >
                Delete
              </button>
              <button
                className='note__btn btn btn--small btn--filled'
                onClick={handleEdit}
              >
                Edit
              </button>
            </div>
          </>
        )}
      </div>
    );
  }
};
