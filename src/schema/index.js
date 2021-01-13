import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  loginEmail: yup
    .string()
    .email('email must be valid!')
    .required('email is required!'),
  loginPassword: yup.string().required('password is required!'),
});

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email('email must be valid!')
    .required('email is required!'),
  password: yup
    .string()
    .required('password is required!')
    .min(5, 'password must be at least 5 characters!'),
  repeatPassword: yup
    .string()
    .required('confirm password is required!')
    .oneOf([yup.ref('password'), null], 'passwords must match!'),
});

export const createNoteSchema = yup.object().shape({
  noteTitle: yup.string().required('note title is required!'),
  noteDescription: yup.string().required('note description is required!'),
});
