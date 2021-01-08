import { useState, useRef } from 'react';
import styled from 'styled-components';
// hook
import { useClickAway } from '../hooks/useClickAway';
// components
import { Button, Input, Textarea, Form } from './';
// react-hook-form
import { useForm } from 'react-hook-form';
// yup
import { yupResolver } from '@hookform/resolvers/yup';
// schema
import { createNoteSchema } from '../schema';

export const CreateNote = () => {
  const [isVisibleInformation, setIsVisibleInformation] = useState(true);
  const [isVisibleCreateNoteForm, setIsVisibleCreateNoteForm] = useState(false);
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

  const onSubmit = async data => {
    console.log(data);
    closeCreateNoteForm();
    reset();
  };

  const noteInformation = (
    <StyledInputSimulator onClick={openCreateNoteForm}>
      Create note...
    </StyledInputSimulator>
  );

  const createNoteForm = (
    <Form onSubmit={handleSubmit(onSubmit)}>
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
