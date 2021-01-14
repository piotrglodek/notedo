import { useState, useRef } from 'react';
import styled from 'styled-components';
// hook
import { useClickAway } from '../hooks/useClickAway';
import { useToggle } from '../hooks/useToggle';
// components
import { Button, Input, Textarea, Form } from './';
// react-hook-form
import { useForm } from 'react-hook-form';
// yup
import { yupResolver } from '@hookform/resolvers/yup';
// schema
import { createNoteSchema } from '../schema';
// firebase
import { auth, db, Timestamp } from '../firebase';
// framer
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
// nanoid
import { nanoid } from '@reduxjs/toolkit';

export const CreateNote = ({ setToastList }) => {
  const [isOpen, handleOpen, handleClose] = useToggle();

  const wrapperRef = useRef(null);
  useClickAway(wrapperRef, handleClose);

  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(createNoteSchema),
    mode: 'onChange',
  });

  const [saveNoteError, setSaveNoteError] = useState(null);
  const onSubmit = async data => {
    const userUID = auth.currentUser.uid;
    const noteId = db.collection('notes').doc().id;

    const noteObject = {
      id: noteId,
      userId: userUID,
      title: data.noteTitle,
      description: data.noteDescription,
      date: Timestamp.fromDate(new Date()),
    };

    await db
      .collection('notes')
      .doc(noteId)
      .set(noteObject)
      .then(() => {
        const toastObject = {
          id: nanoid(),
          message: 'Your note has been saved sucessfully.',
          type: 'success',
        };

        setToastList(arr => [...arr, toastObject]);
      })
      .catch(error => {
        const toastObject = {
          id: nanoid(),
          message: `Couldn't save the note. Try again.`,
          type: 'danger',
        };

        setToastList(arr => [...arr, toastObject]);
        setSaveNoteError(error);
        console.log(`Couldn't save the note. Error: ${error}`);
      });

    handleClose();
    reset();
  };

  return (
    <>
      <AnimateSharedLayout>
        <StyledWrapper layout ref={wrapperRef}>
          <AnimatePresence>
            {isOpen ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                layout
              >
                <Form
                  onSubmit={handleSubmit(onSubmit)}
                  formError={saveNoteError}
                >
                  <StyledHeader>
                    <Input
                      ref={register}
                      error={errors.noteTitle?.message}
                      name='noteTitle'
                      withoutLabel
                      type='text'
                      placeholder='Title'
                      autoFocus
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
                      onClick={() => handleClose()}
                      label='Close'
                      type='button'
                    />
                    <Button type='submit' size='small' label='Save' />
                  </StyledFooter>
                </Form>
              </motion.div>
            ) : (
              <StyledInputSimulator
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                layout
                onClick={handleOpen}
              >
                Create note...
              </StyledInputSimulator>
            )}
          </AnimatePresence>
        </StyledWrapper>
      </AnimateSharedLayout>
    </>
  );
};

const StyledWrapper = styled(motion.div)`
  margin: 4rem auto 0 auto;
  width: 90%;
  max-width: 60rem;
  border: 0.1rem solid ${({ theme: { color } }) => color.gray};
  border-radius: ${({ theme: { borderRadius } }) => borderRadius};
  padding: 0.6rem 1.2rem;
`;
const StyledInputSimulator = styled(motion.div)`
  cursor: text;
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
