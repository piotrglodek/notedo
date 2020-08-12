import React from 'react';
// react-router-dom
import { Link } from 'react-router-dom';
// image
import errorImgSrc from '../assets/images/error-404_image.svg';

export const PageNotFound = () => {
  return (
    <div className='error'>
      <div className='error__span'>
        <h1 className='error__heading'>Page not found</h1>
        <p className='error__text'>
          Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
          mistyped the URL? Be sure to check your spelling.
        </p>
        <Link className='btn btn--filled btn--big' to='/'>
          Take to home
        </Link>
      </div>
      <div className='error__span'>
        <img src={errorImgSrc} alt='404 error' className='error__image' />
      </div>
    </div>
  );
};
