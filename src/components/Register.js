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
import { auth, db } from '../firebase';
// redux
import { useSelector } from 'react-redux';
import { selectAuthState } from '../store/reducers/authSlice';
// router
import { Redirect } from 'react-router-dom';

export const Register = () => {
  const [registerError, setRegisterError] = useState('');

  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(registerSchema),
    mode: 'onChange',
  });
  const onSubmit = async data => {
    await auth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(async () => {
        await db
          .collection('users')
          .doc(auth.currentUser.uid)
          .set({
            theme: 'light',
          })
          .catch(err =>
            console.log(
              `Register error, couldn't create theme for user: ${err}`
            )
          );
      })
      .catch(error => setRegisterError(error.message));
    reset();
  };

  const authState = useSelector(selectAuthState);

  if (authState) {
    return <Redirect to='/notedo' />;
  }

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
