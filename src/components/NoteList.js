import { useEffect, useState } from 'react';
import styled from 'styled-components';
// firebase
import { db, auth, Timestamp } from '../firebase';
// components
import { Spinner, Note } from './';
// image
import notesImage from '../assets/images/add-files_image.svg';
import errorImage from '../assets/images/error-404_image.svg';
// framer
import { motion, AnimatePresence } from 'framer-motion';
// nanoid
import { nanoid } from '@reduxjs/toolkit';

export const NoteList = ({ setToastList }) => {
  const userUID = auth.currentUser.uid;

  const [notes, setNotes] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [fetchNotesError, setFetchNotesError] = useState('');

  useEffect(() => {
    const fetchNotes = db
      .collection('notes')
      .where('userId', '==', userUID)
      .orderBy('date', 'desc')
      .onSnapshot(
        querySnapshot => {
          let temp = [];
          querySnapshot.forEach(doc => {
            temp.push(doc.data());
          });
          setNotes(temp);
          setIsFetching(false);
        },
        error => {
          setFetchNotesError(error);
          setIsFetching(false);
        }
      );

    return () => fetchNotes();
  }, [userUID]);

  const handleDelete = async noteId => {
    await db
      .collection('notes')
      .doc(noteId)
      .delete()
      .then(() => {
        const toastObject = {
          id: nanoid(),
          message: 'Your note has been deleted sucessfully.',
          type: 'success',
        };

        setToastList(arr => [...arr, toastObject]);
      })
      .catch(error => {
        const toastObject = {
          id: nanoid(),
          message: `Couldn't delete the note. Try again.`,
          type: 'danger',
        };

        setToastList(arr => [...arr, toastObject]);
        console.log(`Couldn't delete the note. Error: ${error}`);
      });
  };

  const handleUpdate = async (noteId, title, message) => {
    await db
      .collection('notes')
      .doc(noteId)
      .update({
        title: title,
        description: message,
        date: Timestamp.fromDate(new Date()),
      })
      .then(() => {
        const toastObject = {
          id: nanoid(),
          message: 'Your note has been updated sucessfully.',
          type: 'success',
        };

        setToastList(arr => [...arr, toastObject]);
      })
      .catch(error => {
        const toastObject = {
          id: nanoid(),
          message: `Couldn't update the note. Try again.`,
          type: 'danger',
        };

        setToastList(arr => [...arr, toastObject]);
        console.log(`Couldn't update the note. Error: ${error}`);
      });
  };

  return (
    <StyledWrapper layout>
      {isFetching ? (
        <StyledSpinnerWrapper>
          <Spinner />
        </StyledSpinnerWrapper>
      ) : fetchNotesError ? (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <StyledImage src={errorImage} alt='Error notes image' />
            <StyledHeading>
              Ooops, something went wrong. Try refresh page.
            </StyledHeading>
            <StyledError>{fetchNotesError}</StyledError>
          </motion.div>
        </AnimatePresence>
      ) : notes.length === 0 ? (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <StyledImage src={notesImage} alt='Add notes image' />
            <StyledHeading>You don't have notes. Try create one.</StyledHeading>
          </motion.div>
        </AnimatePresence>
      ) : (
        <StyledGird>
          <AnimatePresence>
            {notes.map(note => (
              <motion.div
                key={note.id}
                inital={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
              >
                <Note
                  note={note}
                  handleDelete={handleDelete}
                  handleUpdate={handleUpdate}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </StyledGird>
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled(motion.main)`
  margin: 3.5rem auto;
  padding: 0 1.6rem;
  width: 100%;
  max-width: 100rem;
`;

const StyledSpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledImage = styled.img`
  width: 100%;
  max-width: 28.8rem;
  display: block;
`;

const StyledHeading = styled.h2`
  display: block;
  letter-spacing: 0.25px;
  font-size: ${({ theme: { fontSize } }) => fontSize.m};
  font-weight: ${({ theme: { fontWeight } }) => fontWeight.semiBold};

  @media screen and (min-width: 768px) {
    font-size: ${({ theme: { fontSize } }) => fontSize.l};
  }
`;

const StyledError = styled.p`
  color: ${({ theme: { color } }) => color.error};
  font-size: ${({ theme: { fontSize } }) => fontSize.xs};
`;

const StyledGird = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr;
  align-items: start;

  @media screen and (min-width: 425px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media screen and (min-width: 1600px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;
