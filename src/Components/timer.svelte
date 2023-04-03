<script lang="ts">
  import { onMount } from "svelte";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import Button, { Label } from "@smui/button";
  import CircularProgress from "@smui/circular-progress";
  import { Temporisador } from "../js/tools";

  export let type: "temporizer" | "Cronometer" | undefined = undefined;
  export let closed = false;
  export let Time = 10;
  export let progress = 0;
  export let start = false;
  const TimerCounter = new Temporisador(Time);

  function TimerTest() {
    const { start: startTimer, stop: stopTimer } = TimerCounter.start(progress);
    startTimer(({ detail: { time, total } }) => {
      start = true;
      progress = (time * 1) / total;
    });
    stopTimer((_) => {
      start = false;
      progress = 0;
    });
  }
  function StopTimerTest() {
    TimerCounter.pause();
    start = false;
  }
  function clearTimerTest() {
    TimerCounter.clear();
    start = false;
  }
  onMount(() => (start == true ? TimerTest() : StopTimerTest()));
</script>

<Cell span={12}>
  <CircularProgress style="height: 200px; width: 200px;" {progress} {closed} />
</Cell>
<Cell span={12}>
  Posicion : {progress}
  Time: {Time}
</Cell>
<Cell span={12}>
  {#if type == "temporizer"}
    {#if start}
      <Button on:click={StopTimerTest}>
        <Label>Stop</Label>
      </Button>
      <Button on:click={clearTimerTest}>
        <Label>Clear</Label>
      </Button>
    {:else}
      <Button on:click={TimerTest}>
        <Label>Start</Label>
      </Button>
    {/if}
  {/if}
</Cell>
