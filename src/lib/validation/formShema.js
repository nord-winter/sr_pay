import {z } from 'zod';

export const formInfoSchema = z.object({
	name: z.string().min(2),
	email: z.string().email(),
	phone: z.string().regex( /^\+66\(\d{2}\)\d{3}-\d{2}-\d{2}$/)
});

export const formAddressSchema = formInfoSchema.extend({
	email: z.string().email(),
	city: z.string().min(5),
	address: z.string().min(5),
	district: z.string().min(5),
	province: z.string().min(5),
	postalCode: z.string().min(5)
});
