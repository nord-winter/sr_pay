<script>
  import FormInfo from '$lib/components/FormInfo.svelte'
  import FormAddress from '$lib/components/FormAddress.svelte';
  import FormPayment from './FormPayment.svelte';
  // import FormConfirmation from './FormConfirmation.svelte';

  import {formInfoSchema, formAddressSchema} from '$lib/validation/formShema';
  import { page } from '$app/stores';
  import { superForm } from 'sveltekit-superforms';
  import SuperDebug from 'sveltekit-superforms';
  import { zod } from 'sveltekit-superforms/adapters';
  // import { enhance } from '$app/forms';


  export let data;
  let total = 1000;
  const CURRENCY_TYPE = 'THB';
  let payload;

  const steps = [zod(formInfoSchema), zod(formAddressSchema)];
  let step = 3;

  


  $: options.validators = steps[step - 1];

  /**
	 * @param {any} payload
	 */
  async function processPayment(payload) {
    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = response.json();
        console.log('Payment Successful:', result);
        return response;
      } else {
        return response;
        console.error('Payment Failed:', response.status);
      }
    } catch (error) {
      return error;
      console.error('Error:', error);
    }
    
  }

	// @ts-ignore
	const { form, errors, message, enhance, validateForm, options } = superForm(data.form, {
		dataType: 'json',
		async onSubmit({ cancel, customRequest }) {

        if (step == 3) {
          OmiseCard.configure({
            publicKey: "pkey_test_60441fm7b49zlzbf5ni"
          });


          OmiseCard.open({
            amount: total * 100, 
            currency: CURRENCY_TYPE,
            defaultPaymentMethod: "credit_card",
            otherPaymentMethods: "promptpay, truemoney",
            onCreateTokenSuccess: (nonce) => {
              // console.log('token creation done', nonce)
              if (nonce.startsWith("tokn_")) {
                payload = {
                  omiseToken: nonce,
                  amount: total *100,
                  ...$form
                }
                //$form.omiseToken = nonce;
              } else {
                payload = {
                  omiseSource: nonce,
                  amount: total *100,
                  ...$form
                }
                // $form.omiseSource = nonce;
              }
            // @ts-ignore
            customRequest(processPayment(payload));
            }
          });
        
        cancel(); // Останавливаем обычную отправку формы
        return;
      }
			// If on last step, make a normal request
			if (step == steps.length) return;

			else cancel();
      
			const result = await validateForm({ update: true });

			if (result.valid) step = step + 1;

		},

		async onUpdated({ form }) {
			if (form.valid) step = 1;
		}
	});


</script>
{#if $message}
	<div class="status" class:error={$page.status >= 400} class:success={$page.status == 200}>
		{$message}
	</div>
{/if}

<div class="col-md-7 col-lg-8">
  <SuperDebug data={$form} />
  <div class="card p-4 pt-5">
    <form class="form-container" method="POST" use:enhance> 
      STEP {step};
      {#if step === 1}
        <FormInfo {form} {errors}/>
      {/if}
      {#if step === 2}
        <FormAddress {form} {errors} />
      {/if}
      {#if step === 3}
       <!-- TODO: Choose product  -->
        <input type="hidden" name="omiseToken">
        <input type="hidden" name="omiseSource">
        <button type="submit" id="checkoutButton" class="btn btn-success">Checkout</button>
        <!-- <FormPayment /> -->
      {/if}
      {#if step === 4}
        <!-- <FormConfirmation /> -->
      {/if}
      <div class="d-flex justify-content-between mt-4">
        {#if step === 4}
          <button type="submit" class="btn btn-success">
            Submit
          </button>
        {/if}
      </div>
    </form>
  </div>
</div>