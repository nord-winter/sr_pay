<script>
    import { writable } from 'svelte/store';
    import * as yup from 'yup';
    import { onMount } from 'svelte';
    import IMask from 'imask';
	// import { message } from 'sveltekit-superforms';

    export let formData = {
        name: '',
        email: '',
        phone: ''
    }

    export let errors = writable({
        name: null,
        email: null,
        phone: null
    })

    /**
	 * @type {import("imask").InputMaskElement}
	 */
    let phoneInput;
    
    onMount(() => {
        const maskOptions = {
            mask: '+{66}(00)000-00-00'
        };
        IMask(phoneInput, maskOptions);
    });
    
    const phoneRegex = /^\+66\(\d{2}\)\d{3}-\d{2}-\d{2}$/

    const validationSchema = yup.object().shape({
        name: yup.string().required({message: 'Name is required'}),
        email: yup.string().email('Invalid email format'),
        phone: yup.string().matches(phoneRegex, {message:"Phone is required"},)
    });

    /**
	 * @param {string} field
	 * @param {any} value
	 */
    async function validateField(field, value) {
        try {
            await validationSchema.validateAt(field, { [field]: value });
            errors.update(e => ({ ...e, [field]: null }));
        } catch (error) {
            errors.update(e => ({ ...e, [field]: error.message }));
        }
    }

    function handleInputChange(event) {
        const { name, value } = event.target; 
        validateField(name, value);
        
    }

</script>

<div class="step step-info">
    <h3>Info</h3>
    <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input
        type="text"
        class="form-control {$errors.name ? 'is-invalid' : ''}"
        id="name"
        name="name"
        bind:value={formData.name}
        on:input={handleInputChange}
        />
        {#if $errors.name}
            <div class="invalid-feedback">Invalid name format</div>
        {/if}
    </div>
    <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
        type="email"
        class="form-control {$errors.email ? 'is-invalid' : ''}"
        id="email"
        name="email"
        bind:value={formData.email}
        on:input={handleInputChange}
        />
        {#if $errors.email}
            <div class="invalid-feedback">Invalid email format</div>
        {/if}
    </div>
    <div class="mb-3">
        <label for="phone" class="form-label">Phone</label>
        <input 
        type="text"
        class="form-control {$errors.phone ? 'is-invalid' : ''}"
        id="email"
        name="phone"
        bind:value={formData.phone}
        bind:this={phoneInput}
        on:input={handleInputChange}
        />
        {#if $errors.phone}
            <div class="invalid-feedback">Invalid email format</div>
        {/if}
    </div>
</div>