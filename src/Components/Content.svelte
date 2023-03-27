<script>
  import LayoutGrid, { Cell } from "@smui/layout-grid";
</script>

<LayoutGrid>
  <Cell span={4}>
    <slot>from</slot>
  </Cell>
  {#if $$slots.hasOwnProperty("components")}
    <slot name="components">from</slot>
  {/if}
</LayoutGrid>
