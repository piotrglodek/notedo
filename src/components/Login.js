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
import { useDispatch } from 'react-redux';
import { setUserEmail } from '../store/reducers/authSlice';

export const Login = () => {
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  });

  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState('');
  const onSubmit = async data => {
    auth
      .signInWithEmailAndPassword(data.email, data.password)
      .then(({ user }) => {
        dispatch(setUserEmail(user.email));
      })
      .catch(error => setLoginError(error.message));
    reset();
  };
  return (
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
  );
};
