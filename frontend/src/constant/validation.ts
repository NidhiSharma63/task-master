import { date, object, ref, string } from 'yup';
import { passwordRegex, regexToTargetAllBlankSpaces } from './regex';

export const loginSchema = object().shape({
  email: string().required('Enter your email').email('Invalid email format'),
  password: string()
    .required('Password required')
    .matches(regexToTargetAllBlankSpaces, 'This field cannot contains sapces'),
});

export const registerSchema = object().shape({
  email: string().required('Enter your email').email('Invalid email format'),
  password: string()
    .required('Password required')
    .matches(regexToTargetAllBlankSpaces, 'This field cannot contain spaces')
    .matches(
      passwordRegex,
      'Password must be 8 characters or more and contain at least one special character',
    ),
  confirmPassword: string()
    .required('Confirm password is required')
    .oneOf([ref('password'), ''], 'Passwords must match'),
});

export const validationForUpdatingTask = object().shape({
  task: string().required('Enter your task').min(1),
  projectName: string().required('Please select a project'),
  dueDate: date().typeError('Please enter valid date').nullable(),
});
