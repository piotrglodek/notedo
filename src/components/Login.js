import { useState } from 'react';
// components
import { Input, Button, Form } from './';
// react-hook-form
import { useForm } from 'react-hook-form';
// yup
import { yupResolver } from '@hookform/resolvers/yup';
// schema
import { loginSchema } from '../schema';
// firebase
import { auth } from '../firebase';
// redux
import { useSelector } from 'react-redux';
import { selectAuthState } from '../store/reducers/authSlice';
// router
import { Redirect } from 'react-router-dom';

export const Login = () => {
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  });

  const [loginError, setLoginError] = useState('');
  const onSubmit = async data => {
    auth
      .signInWithEmailAndPassword(data.loginEmail, data.loginPassword)
      .catch(error => setLoginError(error.message));
    reset();
  };

  const authState = useSelector(selectAuthState);

  if (authState) {
    return <Redirect to='/notedo' />;
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} formError={loginError}>
      <Input
        error={errors.loginEmail?.message}
        ref={register}
        name='loginEmail'
        label='E-mail:'
        id='loginEmail'
        type='email'
        required
      />
      <Input
        error={errors.loginPassword?.message}
        ref={register}
        name='loginPassword'
        label='Password:'
        id='loginPassword'
        type='password'
        required
      />
      <Button size='small' label='Login' type='submit' />
    </Form>
  );
};
