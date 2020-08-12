import React from 'react';
// react-router-dom
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className='header'>
      <div className='header__container'>
        <Link className='header__title' to='/notedo'>
          Notedo
        </Link>
      </div>
    </header>
  );
};
