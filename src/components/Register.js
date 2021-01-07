import { useState } from 'react';
// components
import { Input, Button, Form } from './';
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

export const Register = () => {
  const dispatch = useDispatch();
  const [registerError, setRegisterError] = useState('');

  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(registerSchema),
    mode: 'onChange',
  });
  const onSubmit = async data => {
    await auth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(({ user }) => {
        dispatch(setUserEmail(user.email));
      })
      .catch(error => setRegisterError(error.message));
    reset();
  };
  return (
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
  );
};
