
<script>
  import ProgressBar from './ProgressBar.svelte';
  import FormInfo from "./FormInfo.svelte";
  import FormAddress from './FormAddress.svelte';
  import FormPayment from './FormPayment.svelte';
  import FormConfirmation from './FormConfirmation.svelte';

  import { superForm } from 'sveltekit-superforms';


  //let steps = ['Info', 'Address', 'Payment', 'Confirmation'];
  const steps = [1, 2, 3, 4];
  let step = 1;
  let formData = {
      name: '',
      email: '',
      phone: '+66',
	}
  /**
	 * @type {ProgressBar}
	 */
  let progressBar;


  


  const {form, errors, message, enhance, validateForm, options} = superForm(formData, {

    dataType: 'json',
    async onSubmit({cancel}) {
      if (step < steps.length) {
        cancel();
        return;
      }

      const result = await validateForm({update: true});

      if(!result.valid) {
        console.log('Миша все хуйня, давай по новой, Validation failed:', result.errors);
        return;
      }
      // TODO: Отправка запроса с отправкой всех неоходимых данных в CRM после подтверждения оплаты
      // if (step = steps.length) return; // if (validateStep())
      console.log('FormData:', form);

    },
    async onUpdated() {
      if (form.valid) step = 1;
    }
  });

  const handleProgress = (/** @type {number} */ stepIncrement) => {
    if (validateStep()) {
      step += stepIncrement
    }
		progressBar.handleProgress(stepIncrement)
	}
	


  function validateStep() {
      switch (step) {
          case 1:
              return validateFormInfo();
          case 2:
              return validateFormAddress();
          case 3:
              return validateFormPayment();
          case 4:
              return validateFormConfirmation();
          default:
              return true;
      }
  }

  function validateFormInfo() {
    return true;
  }
  function validateFormAddress() {
    return true;
  }
  function validateFormPayment() {
    return true;
  }
  function validateFormConfirmation() {
    return true;
  }



</script>

<div class="col-md-7 col-lg-8">
  <!-- <ProgressBar {steps} bind:step bind:this={progressBar} /> -->
  <div class="card p-4 pt-5">
    <!-- <pre>{JSON.stringify(formData)}</pre> -->
    <form class="form-container" use:enhance>
      {#if step === 1}
        <FormInfo bind:formData={formData} />
      {/if}
      {#if step === 2}
        <FormAddress />
      {/if}
      {#if step === 3}
        <FormPayment />
      {/if}
      {#if step === 4}
        <FormConfirmation />
      {/if}
      <div class="d-flex justify-content-between mt-4">
        <button
          type="button"
          class="btn btn-secondary"
          on:click={() => handleProgress(-1)} 
          disabled={step == 1}
        >
          Previous
        </button>
        {#if step < 4}
        <button type="button" class="btn btn-primary"
        on:click={() => handleProgress(+1)} 
        disabled={step !== steps.length}>
          Next
        </button>
        {/if}
        {#if step === 4}
        <button type="submit" class="btn btn-success">
          Submit
        </button>
        {/if}
      </div>
    </form>
  </div>
</div>