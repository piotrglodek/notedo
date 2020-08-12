import React from 'react';
// components
import { Header } from '../components/Header';
import { Tabs } from '../components/Tabs';
import { NoNotes } from '../components/NoNotes';
// icons
import { ReactComponent as NotesIconSvg } from '../assets/icons/description_icon.svg';
import { ReactComponent as FavoriteIconSvg } from '../assets/icons/favorite-filed_icon.svg';
// redux components
import { Note } from '../redux/components/Note';
// redux
import { useSelector } from 'react-redux';
// selectors
import {
  selectAllNotes,
  selectFavoriteNotes,
} from '../redux/features/notesSlice';

export const Notedo = () => {
  const notes = useSelector(selectAllNotes);
  const favoriteNotes = useSelector(selectFavoriteNotes);
  const whatToRender = (data) => {
    if (data.length !== 0) {
      return (
        <>
          {data.map((data) => (
            <Note key={data.id} data={data} />
          ))}
        </>
      );
    } else {
      return <NoNotes />;
    }
  };
  return (
    <>
      <Header />
      <Tabs
        tabs={[
          {
            label: 'All notes',
            tabIcon: <NotesIconSvg />,
            render: whatToRender(notes),
          },
          {
            label: 'Favorite notes',
            tabIcon: <FavoriteIconSvg />,
            render: whatToRender(favoriteNotes),
          },
        ]}
      />
    </>
  );
};
