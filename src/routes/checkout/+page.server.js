import { fail } from '@sveltejs/kit';
import { z } from 'zod';
import { formAddressSchema as lastStep } from '$lib/validation/formShema.js';

export const load = async () => {
	const form = {
		// Инициализация пустыми значениями или значениями по умолчанию
		name: '',
		email: '',
		phone: '',
		city: '',
		address: '',
		district: '',
		province: '',
		postcode: ''
	};

	return { form };
};

export const actions = {
	default: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());

		// Валидация с использованием zod
		const validationResult = lastStep.safeParse(formData);

		if (!validationResult.success) {
			const errors = validationResult.error.flatten().fieldErrors;
			return fail(400, { form: formData, errors });
		}

		return {
			status: 200,
			body: {
				form: formData,
				message: 'Form posted successfully!'
			}
		};
	}
};
