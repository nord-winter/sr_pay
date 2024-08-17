import { superValidate, message } from 'sveltekit-superforms';
import { fail } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import {formAddressSchema as lastStep} from '$lib/validation/formShema.js';


export const load = async () => {
    
	const form = await superValidate(zod(lastStep));
	console.log(form);

	return { form };
};

export const actions = {
	default: async ({ request }) => {

		const form = await superValidate(request, zod(lastStep));

        console.log(form);
		if (!form.valid) return fail(400, { form });

		return message(form, 'Form posted successfully!');
	}
};