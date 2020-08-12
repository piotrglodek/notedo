import React from 'react';
// image
import addFilesImgSrc from '../assets/images/add-files_image.svg';

export const NoNotes = () => {
  return (
    <div className='no-note'>
      <p className='no-note__text'>You don't have any note.</p>
      <img className='no-note__image' src={addFilesImgSrc} alt='add files' />
    </div>
  );
};
