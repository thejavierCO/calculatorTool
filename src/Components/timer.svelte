<script lang="ts">
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import Button, { Label } from "@smui/button";
  import CircularProgress from "@smui/circular-progress";

  export let type: "temporizer" | "Cronometer" | undefined = undefined;
  export let progress = 0;
  export let closed = false;
</script>

<Cell span={12}>
  <CircularProgress style="height: 200px; width: 200px;" {progress} {closed} />
</Cell>
<Cell span={12}>
  {#if type == "temporizer"}
    <Button>
      <Label>Start</Label>
    </Button>
    <Button>
      <Label>Stop</Label>
    </Button>
    <Button>
      <Label>Edit</Label>
    </Button>
  {/if}
</Cell>
