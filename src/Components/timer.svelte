<script lang="ts">
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import Button, { Label } from "@smui/button";
  import CircularProgress from "@smui/circular-progress";

  export let type: "temporizer" | "Cronometer" | undefined = undefined;
  export let closed = false;
  export let Time = 30;
  let temp;
  let progress = 0;
  let start = false;
  function TimerTest() {
    start = true;
    temp = setInterval(() => {
      if (progress < 0.99) progress = progress + 1 / Time;
      else {
        progress = 1;
        clearInterval(temp);
        setTimeout(() => {
          progress = 0;
          start = false;
        }, 500);
      }
    }, 1000);
  }
  function StopTimerTest() {
    clearInterval(temp);
    start = false;
  }
</script>

<Cell span={12}>
  <CircularProgress style="height: 200px; width: 200px;" {progress} {closed} />
</Cell>
<Cell span={12}>
  {#if type == "temporizer"}
    {#if start}
      <Button on:click={StopTimerTest}>
        <Label>Stop</Label>
      </Button>
    {:else}
      <Button on:click={TimerTest}>
        <Label>Start</Label>
      </Button>
    {/if}
    <Button>
      <Label>Edit</Label>
    </Button>
  {/if}
</Cell>
