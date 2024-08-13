<script>
    let formData = {
        address: {
            city: 'city',
            district: 'district',
            province: 'province',
            postcode: 'postcode'
        }

    }
    let errors = {
        info: true,

    }

</script>

<div class="step step-info">
    <h3>Address</h3>

    <div class="mb-3">
        <label for="city" class="form-label">City</label>
        <input
        type="text"
        class="form-control is-invalid"
        id="city"
        bind:value={formData.address.city}
        />
        {#if true}<div class="invalid-feedback">ERROR</div>{/if}
    </div>
    <div class="mb-3">
        <label for="district" class="form-label">District</label>
        <input
        type="district"
        class="form-control {true ? 'is-invalid' : ''}"
        id="district"
        bind:value={formData.address.district}
        />
        {#if errors.info}<div class="invalid-feedback">ERROR</div>{/if}
    </div>
    <div class="mb-3">
        <label for="province" class="form-label">Province</label>
        <input 
        type="text"
        class="form-control {true ? 'is-invalid' : ''}"
        id="province"
        bind:value={formData.address.province}
        />
        {#if errors.info}<div class="invalid-feedback">{errors.info}</div>{/if}
    </div>
    <div class="mb-3">
        <label for="postcode" class="form-label">Postcode</label>
        <input 
        type="text"
        class="form-control {true ? 'is-invalid' : ''}"
        id="postcode"
        bind:value={formData.address.postcode}
        />
        {#if errors.info}<div class="invalid-feedback">{errors.info}</div>{/if}
    </div>
</div>