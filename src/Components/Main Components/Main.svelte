<script>
  import { createEventDispatcher, onMount } from "svelte";
  let emit = createEventDispatcher();
  onMount(() =>
    window.addEventListener("storage", ({ key, newValue, oldValue }) =>
      emit("storage", { key, newValue, oldValue })
    )
  );
</script>

<main>
  <slot />
</main>
