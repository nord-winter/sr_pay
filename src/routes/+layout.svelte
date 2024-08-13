<script>
    import 'bootstrap/dist/css/bootstrap.min.css';
    import '$lib/vendor/bootstrap-icons/bootstrap-icons.css';
    import '$lib/vendor/aos/aos.css';
    import '$lib/vendor/glightbox/css/glightbox.min.css';
    import '$lib/vendor/swiper/swiper-bundle.min.css';
    import '$lib/vendor/theme-bootlander/main.css';

    import {onMount} from 'svelte'

    onMount(async () => {

        const bootstrap = await import('bootstrap/dist/js/bootstrap.bundle.min.js');
        const aos = await import('$lib/vendor/aos/aos.js');
        const glightbox = await import('$lib/vendor/glightbox/js/glightbox.min.js');
        const purecounter_vanilla = await import('$lib/vendor/purecounter/purecounter_vanilla.js');
        // @ts-ignore
        const swiper = await import('$lib/vendor/swiper/swiper-bundle.min.js');

        aos.refresh();
    });

    import Header from '$lib/components/Header.svelte';
</script>

<div class="app">
	<Header />

	<main class="main">
		<slot />
	</main>

	<footer>
		<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
	</footer>
</div>
