
<script>
  import ProgressBar from './ProgressBar.svelte';
  import FormInfo from "./FormInfo.svelte";
  import FormAddress from './FormAddress.svelte';
  import FormPayment from './FormPayment.svelte';
  import FormConfirmation from './FormConfirmation.svelte';

  let steps = ['Info', 'Address', 'Payment', 'Confirmation']
  let currentActive = 1;
  let progressBar = ProgressBar;


  
  let formData = {
      name: '',
      email: '',
      phone: ''
	}
	
	const handleSubmit = () => {
		console.log("Your form data => ",formData)
	}

  const handleProgress = (stepIncrement) => {
		progressBar.handleProgress(stepIncrement)
	}



</script>

<div class="col-md-7 col-lg-8">
  <ProgressBar {steps} bind:currentActive bind:this={progressBar} />
  <div class="card p-4 pt-5">
    <form class="form-container" on:submit={handleSubmit}>
      {#if currentActive === 1}
        <FormInfo />
      {/if}
      {#if currentActive === 2}
        <FormAddress />
      {/if}
      {#if currentActive === 3}
        <FormPayment />
      {/if}
      {#if currentActive === 4}
        <FormConfirmation />
      {/if}
      <div class="d-flex justify-content-between mt-4">
        <button
          type="button"
          class="btn btn-secondary"
          on:click={() => handleProgress(-1)} 
          disabled={currentActive == 1}
        >
          Previous
        </button>
        {#if currentActive < 4}
        <button type="button" class="btn btn-primary"
        on:click={() => handleProgress(+1)} 
        disabled={currentActive == steps.length}>
          Next
        </button>
        {/if}
        {#if currentActive === 4}
        <button type="submit" class="btn btn-success">
          Submit
        </button>
        {/if}
      </div>
    </form>
  </div>
</div>