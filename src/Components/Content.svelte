<script>
  import LayoutGrid, { Cell } from "@smui/layout-grid";
</script>

<LayoutGrid>
  <Cell span={4}>
    <slot>from</slot>
  </Cell>
</LayoutGrid>
