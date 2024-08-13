
<script>
    let formData = {
        info: {
            name: 'NAME',
            email: 'EMAIL',
            phone: 'PHONE'
        }

    }
    let errors = {
        info: true,

    }

</script>

<div class="step step-info">
    <h3>Info</h3>

    <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input
        type="text"
        class="form-control is-invalid"
        id="name"

        />
        {#if true}<div class="invalid-feedback">ERROR</div>{/if}
    </div>
    <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
        type="email"
        class="form-control {true ? 'is-invalid' : ''}"
        id="email"
        bind:value={formData.info.email}
        />
        {#if errors.info}<div class="invalid-feedback">ERROR</div>{/if}
    </div>
    <div class="mb-3">
        <label for="phone" class="form-label">Phone</label>
        <input 
        type="text"
                class="form-control {true ? 'is-invalid' : ''}"
        id="email"
        bind:value={formData.info.email}
        />
        <!-- <InputMask
        class="form-control {$errors.info ? 'is-invalid' : ''}"
        id="phone"
        mask="+{7} (000) 000-00-00"
        bind:value={$formData.info.phone}
        on:input={() => validateField('phone')}
        /> -->
        {#if errors.info}<div class="invalid-feedback">{errors.info}</div>{/if}
    </div>
    </div>