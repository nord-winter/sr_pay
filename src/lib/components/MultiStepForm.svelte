<script>
  import FormInfo from '$lib/components/FormInfo.svelte'
  import FormAddress from '$lib/components/FormAddress.svelte';
  // import FormPayment from './FormPayment.svelte';
  // import FormConfirmation from './FormConfirmation.svelte';

  import {formInfoSchema, formAddressSchema} from '$lib/validation/formShema';
  import { page } from '$app/stores';
  import { superForm } from 'sveltekit-superforms';
  import SuperDebug from 'sveltekit-superforms';
  import { zod } from 'sveltekit-superforms/adapters';


  export let data;

  const steps = [zod(formInfoSchema), zod(formAddressSchema)];
  let step = 1;

  


  $: options.validators = steps[step - 1];


	// @ts-ignore
	const { form, errors, message, enhance, validateForm, options } = superForm(data.form, {
		dataType: 'json',
		async onSubmit({ cancel }) {
      console.log('Wtf');
			// If on last step, make a normal request
			if (step == steps.length) return;

			else cancel();
      
			const result = await validateForm({ update: true });

			if (result.valid) step = step + 1;

		},

		async onUpdated({ form }) {
      step = step + 1;
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