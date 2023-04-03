<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import Button, { Label } from "@smui/button";
  import CircularProgress from "@smui/circular-progress";

  let emit = createEventDispatcher();
  export let type: "temporizer" | "Cronometer" | undefined = undefined;
  export let closed = false;
  export let Time = 30;
  export let progress = 0;
  let temp;
  let start = false;
  function TimerTest() {
    start = true;
    temp = setInterval(() => {
      if (progress < 0.99) {
        progress = progress + 1 / Time;
        emit("progress", progress);
      } else {
        progress = 1;
        emit("progress", progress);
        clearInterval(temp);
        setTimeout(() => {
          progress = 0;
          start = false;
          emit("progress", progress);
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
