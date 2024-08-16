import * as yup from 'yup';

const phoneRegex = /^\+66\(\d{2}\)\d{3}-\d{2}-\d{2}$/;

export const formInfoSchema = yup.object().shape({
	name: yup.string().required('Name is required'),
	email: yup.string().email('Invalid email format').required('Email is required'),
	phone: yup.string().matches(phoneRegex, 'Invalid phone format').required('Phone is required')
});
