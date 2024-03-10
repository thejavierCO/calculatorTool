<script lang="ts">
  import Textfield from "@smui/textfield";
  import { Cell } from "@smui/layout-grid";
  export let value = "";
  export let label = "Time";
  export let suffix = "";
</script>

<Cell span={4}>
  <Textfield
    on:load={(evt) => console.log(evt)}
    bind:value
    bind:label
    bind:suffix
    type="number"
  />
</Cell>
