import React from 'react';
// react-router-dom
import { Link } from 'react-router-dom';
// image
import notesImageSrc from '../assets/images/notes_image.svg';

export const Home = () => {
  return (
    <div className='home'>
      <div className='home__span'>
        <h1 className='home__heading'>
          Notedo will save <br /> Your thoughts
        </h1>
        <p className='home__text'>
          Notedo is tool that allows you to add, edit and delete notes in any
          time you want.
        </p>
        <Link className='btn btn--big btn--filled' to='/notedo'>
          Try notedo
        </Link>
      </div>
      <div className='home__span'>
        <img src={notesImageSrc} alt='notes' className='home__image' />
      </div>
      <footer className='home__footer'>
        <a
          rel='noopener noreferrer'
          className='home__footer__link'
          target='_blank'
          href='https://stories.freepik.com/work'
        >
          Illustrations by Freepik
        </a>
      </footer>
    </div>
  );
};
