import { useState, useRef } from 'react';
import styled from 'styled-components';
// hook
import { useClickAway } from '../hooks/useClickAway';
// components
import { Button, Input, Textarea, Form, Toast } from './';
// react-hook-form
import { useForm } from 'react-hook-form';
// yup
import { yupResolver } from '@hookform/resolvers/yup';
// schema
import { createNoteSchema } from '../schema';
// firebase
import { auth, db, FieldValue } from '../firebase';

export const CreateNote = () => {
  const [isVisibleInformation, setIsVisibleInformation] = useState(true);
  const [isVisibleCreateNoteForm, setIsVisibleCreateNoteForm] = useState(false);
  const [saveNoteError, setSaveNoteError] = useState(null);

  const wrapperRef = useRef(null);

  const openCreateNoteForm = () => {
    setIsVisibleInformation(false);
    setIsVisibleCreateNoteForm(true);
  };
  const closeCreateNoteForm = () => {
    setIsVisibleInformation(true);
    setIsVisibleCreateNoteForm(false);
  };

  useClickAway(wrapperRef, closeCreateNoteForm);

  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(createNoteSchema),
    mode: 'onChange',
  });

  // toast
  const [toastList, setToastList] = useState([]);
  const [toastId, setToastId] = useState(0);

  const onSubmit = async data => {
    const userUID = auth.currentUser.uid;
    const noteObject = {
      userId: userUID,
      title: data.noteTitle,
      description: data.noteDescription,
      timestamp: FieldValue.serverTimestamp(),
    };

    await db
      .collection('notes')
      .add(noteObject)
      .then(() => {
        const toastObject = {
          id: toastId,
          message: 'Your note has been saved sucessfully.',
          type: 'success',
        };

        setToastList(arr => [...arr, toastObject]);
        setToastId(prevState => prevState + 1);
      })
      .catch(error => setSaveNoteError(error));

    closeCreateNoteForm();
    reset();
  };

  const noteInformation = (
    <StyledInputSimulator onClick={openCreateNoteForm}>
      Create note...
    </StyledInputSimulator>
  );

  const createNoteForm = (
    <Form onSubmit={handleSubmit(onSubmit)} formError={saveNoteError}>
      <StyledHeader>
        <Input
          ref={register}
          error={errors.noteTitle?.message}
          name='noteTitle'
          withoutLabel
          type='text'
          placeholder='Title'
        />
        <Textarea
          ref={register}
          error={errors.noteDescription?.message}
          name='noteDescription'
          withoutLabel
          placeholder='Description'
          resize={false}
          rows={8}
        />
      </StyledHeader>
      <StyledFooter>
        <Button
          size='small'
          variant='secondary'
          onClick={() => closeCreateNoteForm()}
          label='Close'
          type='button'
        />
        <Button type='submit' size='small' label='Save' />
      </StyledFooter>
    </Form>
  );

  return (
    <StyledWrapper>
      <StyledWrapperBorder ref={wrapperRef}>
        {isVisibleInformation && noteInformation}
        {isVisibleCreateNoteForm && createNoteForm}
      </StyledWrapperBorder>
      <Toast toastList={toastList} setToastList={setToastList} autoDelete />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  margin: 4rem auto 0 auto;
  width: 90%;
  max-width: 60rem;
`;
const StyledWrapperBorder = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 0.3rem;
  padding: 0.6rem 1.2rem;
`;
const StyledInputSimulator = styled.div`
  cursor: text;
  color: rgba(0, 0, 0, 0.7);
  font-size: 1.5rem;
  height: 3.2rem;
  font-weight: ${({ theme: { fontWeight } }) => fontWeight.semiBold};
  display: flex;
  align-items: center;
`;
const StyledHeader = styled.header`
  margin-top: 1rem;
`;
const StyledFooter = styled.footer`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
  & :first-child {
    margin-right: 1rem;
  }
`;
