import { superValidate, message } from 'sveltekit-superforms';
import { fail } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import {formAddressSchema as lastStep} from '$lib/validation/formShema.js';


export const load = async () => {
    
	const form = await superValidate(zod(lastStep));

	return { form };
};

export const actions = {
	checkout: async ({ request }) => {
		// console.log(request);

		const form = await superValidate(request, zod(lastStep));

		if (!form.valid) return fail(400, { form });

		return message(form, 'Form posted successfully!');
	},
	processPayment: async ({ request }) => {
		try {
			const data = await request.json();

			console.log('Processing payment with data:', data);

			if (!data.omiseToken && !data.omiseSource) {
				return fail(400, { error: 'Missing payment token or source' });
			}

			return {
				status: 200,
				body: {
					message: 'Payment processed successfully!'
				}
			};
		} catch (error) {
			console.error('Payment processing error:', error);
			return fail(500, { error: 'Internal server error' });
		}
	}
};