import { useState } from 'react';
import styled from 'styled-components';
// components
import { Input, Button, Form } from '../components';
// images
import notesImage from '../assets/images/notes_image.svg';
// react-hook-form
import { useForm } from 'react-hook-form';
// yup
import { yupResolver } from '@hookform/resolvers/yup';
// schema
import { loginSchema } from '../schema';
// firebase
import { auth } from '../firebase';
// redux
import { useDispatch } from 'react-redux';
import { setUserEmail } from '../store/reducers/authSlice';
// router
import { useHistory } from 'react-router-dom';

export const Home = () => {
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  });

  const history = useHistory();
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState('');
  const onSubmit = async data => {
    auth
      .signInWithEmailAndPassword(data.email, data.password)
      .then(({ user }) => {
        dispatch(setUserEmail(user.email));
        history.push('/notedo');
      })
      .catch(error => setLoginError(error.message));
    reset();
  };

  return (
    <>
      <StyledMain>
        <StyledRow>
          <StyledCol>
            <StyledHeading>Login to Notedo</StyledHeading>
            <StyledFormWrapper>
              <Form onSubmit={handleSubmit(onSubmit)} formError={loginError}>
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
                <Button size='small' label='Login' type='submit' />
              </Form>
            </StyledFormWrapper>
          </StyledCol>
          <StyledCol>
            <StyledImage src={notesImage} />
            <StyledHeading2>Notedo will save Your thoughts</StyledHeading2>
            <StyledText>
              Notedo is tool that allows you to add, edit and delete notes in
              any time you want.
            </StyledText>
          </StyledCol>
        </StyledRow>
      </StyledMain>
    </>
  );
};

const StyledMain = styled.main`
  margin-top: 3rem;
`;
const StyledRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 1.6rem;
`;
const StyledCol = styled.div`
  width: 100%;
  padding: 0 1rem 3rem;
  @media screen and (min-width: 676px) {
    flex: 1;
  }
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
const StyledFormWrapper = styled.div`
  width: 100%;
  max-width: 34rem;
`;
const StyledImage = styled.img`
  display: block;
  width: 100%;
  max-width: 34rem;
`;
const StyledHeading2 = styled.h2`
  font-size: ${({ theme: { fontSize } }) => fontSize.m};
  color: ${({ theme: { color } }) => color.black};
`;
const StyledText = styled.p`
  color: ${({ theme: { color } }) => color.grey};
`;
