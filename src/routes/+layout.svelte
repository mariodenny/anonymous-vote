<script>
    import 'bootstrap/dist/css/bootstrap.min.css';
    import { onMount } from 'svelte';
  
    onMount(async () => {
      await import('bootstrap/dist/js/bootstrap.bundle.min.js');
    });
  </script>

<nav class="navbar navbar-dark bg-dark px-3">
    <span class="navbar-brand">Anonymous Vote</span>
</nav>

<main class="container mt-4">
    <slot />
</main>