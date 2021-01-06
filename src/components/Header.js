import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, IconButton, Input, Form } from './';
// icon
import { ReactComponent as CloseIcon } from '../assets/icons/close_icon.svg';
// react-hook-form
import { useForm } from 'react-hook-form';
// yup
import { yupResolver } from '@hookform/resolvers/yup';
// schema
import { registerSchema } from '../schema';
// firebase
import { auth } from '../firebase';
// redux
import { useDispatch } from 'react-redux';
import { setUserEmail } from '../store/reducers/authSlice';
// router
import { useHistory } from 'react-router-dom';

export const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  // const userEmail = useSelector(selectUserEmail);
  const [wantRegister, setWantRegister] = useState(false);
  const [registerError, setRegisterError] = useState('');

  // unable scroll for modal
  useEffect(() => {
    if (wantRegister) {
      document.body.style = `overflow:hidden;`;
    } else {
      document.body.style = null;
    }
  }, [wantRegister]);

  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(registerSchema),
    mode: 'onChange',
  });
  const onSubmit = async data => {
    await auth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(({ user }) => {
        dispatch(setUserEmail(user.email));
        history.push('/notedo');
      })
      .catch(error => setRegisterError(error.message));
    reset();
  };

  return (
    <>
      <StyledHeader>
        <StyledTitle>Notedo</StyledTitle>
        <Button
          variant='secondary'
          size='small'
          label='Register'
          title='Open register modal'
          onClick={() => setWantRegister(true)}
        />
      </StyledHeader>
      {wantRegister && (
        <StyledModal>
          <StyledModalWrapper>
            <StyledClose>
              <IconButton
                onClick={() => setWantRegister(false)}
                title='Close register modal'
                ariaLabel='Close register modal'
                icon={<CloseIcon />}
              />
            </StyledClose>
            <StyledHeading>Create account</StyledHeading>
            <Form onSubmit={handleSubmit(onSubmit)} formError={registerError}>
              <Input
                error={errors.email?.message}
                ref={register}
                name='email'
                label='E-mail:'
                id='email'
                type='email'
                required
              />
              <Input
                error={errors.password?.message}
                ref={register}
                name='password'
                label='Password:'
                id='password'
                type='password'
                required
              />
              <Input
                error={errors.repeatPassword?.message}
                ref={register}
                name='repeatPassword'
                label='Repeat password:'
                id='repeatPassword'
                type='password'
                required
              />
              <Button type='submit' label='Create account' size='small' />
            </Form>
          </StyledModalWrapper>
        </StyledModal>
      )}
    </>
  );
};

const StyledHeader = styled.header`
  padding: 1.2rem 1.6rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const StyledTitle = styled.span`
  display: block;
  color: ${({ theme: { color } }) => color.black};
  letter-spacing: 0.25px;
  font-size: ${({ theme: { fontSize } }) => fontSize.m};
  font-weight: ${({ theme: { fontWeight } }) => fontWeight.semiBold};

  @media screen and (min-width: 768px) {
    font-size: ${({ theme: { fontSize } }) => fontSize.l};
  }
`;
const StyledModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: grid;
  place-items: center;
  overflow: auto;
  z-index: 999;
`;
const StyledModalWrapper = styled.div`
  width: 100%;
  max-width: 62.5rem;
  margin: 0 auto;
  background-color: ${({ theme: { color } }) => color.white};
  padding: 1rem 1.6rem;
  border-radius: 0.3rem;
  position: relative;
  z-index: 1;
`;
const StyledClose = styled.span`
  position: absolute;
  top: 1rem;
  right: 1.6rem;
`;
const StyledHeading = styled.h1`
  font-size: ${({ theme: { fontSize } }) => fontSize.l};
  color: ${({ theme: { color } }) => color.black};
  position: relative;
  &::after {
    content: '';
    z-index: -1;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 7rem;
    height: 0.8rem;
    background-color: ${({ theme: { color } }) => color.primaryTint};
    opacity: 0.7;
  }
`;
