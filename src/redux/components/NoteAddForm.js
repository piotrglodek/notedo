import React, { useState } from 'react';
// icons
import { ReactComponent as AddIconSvg } from '../../assets/icons/add-circle_icon.svg';
import { ReactComponent as CloseIconSvg } from '../../assets/icons/close_icon.svg';
// redux
import { useDispatch } from 'react-redux';
import { noteAdded } from '../features/notesSlice';

export const NoteAddForm = () => {
  const [showForm, setToggleForm] = useState(false);
  const toggleForm = () => setToggleForm(!showForm);

  const [noteTitle, setNoteTitle] = useState('');
  const [noteText, setNoteText] = useState('');
  const handleInput = (e) => {
    setNoteTitle(e.target.value);
  };
  const handleTextarea = (e) => {
    setNoteText(e.target.value);
  };

  const dispatch = useDispatch();
  const [errorMsgInput, setErrorMsgInput] = useState(null);
  const [errorMsgTextarea, setErrorMsgTextarea] = useState(null);
  const handleSubmit = () => {
    if (noteTitle && noteText) {
      dispatch(noteAdded(noteTitle, noteText));
      setNoteTitle('');
      setNoteText('');
      setErrorMsgInput(null);
      setErrorMsgTextarea(null);
      setToggleForm(!showForm);
    } else {
      if (noteTitle === '') {
        setErrorMsgInput('note title must be filled');
      } else {
        setErrorMsgInput(null);
      }
      if (noteText === '') {
        setErrorMsgTextarea('note text must be filled');
      } else {
        setErrorMsgTextarea(null);
      }
    }
  };
  return (
    <>
      <button onClick={toggleForm} className='btn-circle form__add-icon'>
        <AddIconSvg className='btn-circle__icon' />
      </button>
      <div className={`${showForm ? 'form form--active' : 'form'}`}>
        <button onClick={toggleForm} className='form__close'>
          <CloseIconSvg className='form__close-icon' />
        </button>
        <div className='form__container'>
          <label htmlFor='noteTitle' className='form__label'>
            <input
              type='text'
              id='noteTitle'
              className='form__input'
              required
              value={noteTitle}
              onChange={handleInput}
            />
            <span
              className={`${
                noteTitle.length
                  ? 'form__support-text active'
                  : 'form__support-text '
              }`}
            >
              Note title
            </span>
            <span
              className={`${
                errorMsgInput !== null
                  ? 'form__error form__error--active'
                  : 'form__error'
              }`}
            >
              {errorMsgInput !== null ? errorMsgInput : null}
            </span>
          </label>
          <label htmlFor='noteText' className='form__label'>
            <textarea
              type='text'
              id='noteText'
              className='form__input form__input-textarea'
              required
              value={noteText}
              onChange={handleTextarea}
            />
            <span
              className={`${
                noteText.length
                  ? 'form__support-text active'
                  : 'form__support-text '
              }`}
            >
              Note content
            </span>
            <span
              className={`${
                errorMsgTextarea !== null
                  ? 'form__error form__error--active'
                  : 'form__error'
              }`}
            >
              {errorMsgTextarea !== null ? errorMsgTextarea : null}
            </span>
          </label>
          <button
            onClick={handleSubmit}
            className='form__submit btn btn--small btn--filled'
          >
            Add note
          </button>
        </div>
      </div>
    </>
  );
};
