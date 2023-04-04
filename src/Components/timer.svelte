<script lang="ts">
  import { onMount } from "svelte";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import Button, { Label } from "@smui/button";
  import CircularProgress from "@smui/circular-progress";
  import { Temporisador } from "../js/tools";
  import { store } from "../js/data";

  export let type: "temporizer" | "Cronometer" | undefined = undefined;
  // export let closed = false;
  export let time = 10;
  export let progress = 0;
  export let status = false;
  export let id;
  const TimerCounter = new Temporisador(time);

  function TimerTest() {
    const { start: startTimer, stop: stopTimer } = TimerCounter.start(progress);
    startTimer(({ detail: { time, total } }) => {
      status = true;
      progress = (time * 1) / total;
      store.edit(id, (a) => {
        a.progress = progress;
        return a;
      });
    });
    stopTimer((_) => {
      status = false;
      progress = 0;
      store.edit(id, (a) => {
        a.progress = 0;
        return a;
      });
    });
  }
  function StopTimerTest() {
    TimerCounter.pause();
    status = false;
  }
  function clearTimerTest() {
    TimerCounter.clear();
    status = false;
  }
  onMount(() => (status == true ? TimerTest() : StopTimerTest()));
  store.on("del", (_) => {
    console.log(store.get(id));
  });
</script>

<Cell span={12}>
  <CircularProgress style="height: 200px; width: 200px;" {progress} {closed} />
  <slot>initasda</slot>
</Cell>
<Cell span={12}>
  Posicion : {progress}
  Time: {time}
</Cell>
<Cell span={12}>
  {#if type == "temporizer"}
    {#if status}
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
