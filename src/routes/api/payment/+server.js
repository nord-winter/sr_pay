export async function POST({ request }) {
	try {

		const payload = await request.json();

		const paymentResult = await processPayment(payload);
		console.log(payload);

		if (paymentResult.success) {
			return new Response(
				JSON.stringify({
					success: true,
					message: 'Payment processed successfully',
					data: paymentResult.data
				}),
				{ status: 200 }
			);
		} else {
			return new Response(
				JSON.stringify({
					success: false,
					message: 'Payment processing failed',
					error: paymentResult.error
				}),
				{ status: 400 }
			);
		}
	} catch (error) {
		return new Response(
			JSON.stringify({ success: false, message: 'Server error', error: error.message }),
			{ status: 500 }
		);
	}
}


async function processPayment(payload) {
	if (payload.amount > 0 && payload.omiseSource) {
		return { success: true, data: { transactionId: '123456', amount: payload.amount } };
	} 	else if (payload.amount > 0 && payload.omiseToken) {
		return { success: true, data: { transactionId: '123456', amount: payload.amount } };
	} else {
		return { success: false, error: 'Invalid payment details' };
	}
}
