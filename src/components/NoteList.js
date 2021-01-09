import { useEffect, useState } from 'react';
import styled from 'styled-components';
// firebase
import { db, auth } from '../firebase';
// components
import { Spinner } from './';
// image
import notesImage from '../assets/images/add-files_image.svg';
import errorImage from '../assets/images/error-404_image.svg';

export const NoteList = () => {
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
            console.log('data', doc.data());
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

  return (
    <StyledWrapper>
      {isFetching ? (
        <StyledSpinnerWrapper>
          <Spinner />
        </StyledSpinnerWrapper>
      ) : fetchNotesError ? (
        <>
          <StyledImage src={errorImage} alt='Error notes image' />
          <StyledHeading>
            Ooops, something went wrong. Try refresh page.
          </StyledHeading>
          <StyledError>{fetchNotesError}</StyledError>
        </>
      ) : notes.length === 0 ? (
        <>
          <StyledImage src={notesImage} alt='Add notes image' />
          <StyledHeading>You don't have notes. Try create one.</StyledHeading>
        </>
      ) : (
        'we have note!'
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.main`
  margin: 3.5rem auto;
  padding: 0 1.6rem;
  width: 100%;
  max-width: 80rem;
`;

const StyledSpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledImage = styled.img`
  height: 32rem;
  display: block;
`;

const StyledHeading = styled.h2`
  display: block;
  color: ${({ theme: { color } }) => color.black};
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
