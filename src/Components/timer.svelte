<script lang="ts">
  import { createEventDispatcher, onDestroy } from "svelte";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import Button, { Label } from "@smui/button";
  import CircularProgress from "@smui/circular-progress";
  import { Temporisador } from "../js/tools";

  export let type: "temporizer" | "Cronometer" | undefined = undefined;
  export let closed = false;
  export let Time = 5;
  export let progress = 0;
  let start = false;
  const emit = createEventDispatcher();
  const TimerCounter = new Temporisador(Time);

  function TimerTest() {
    const { start: startTimer, stop: stopTimer } = TimerCounter.start();
    startTimer(({ detail: { time, total } }) => {
      start = true;
      progress = (time * 1) / total;
      emit("progress", progress);
    });
    stopTimer((_) => {
      start = false;
      progress = 0;
      emit("progress", progress);
    });
  }
  function StopTimerTest() {
    TimerCounter.pause();
    start = false;
  }
  function clearTimerTest() {
    TimerCounter.clear();
  }
  onDestroy(() => StopTimerTest());
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
