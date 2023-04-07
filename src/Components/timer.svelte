<script lang="ts">
  import { beforeUpdate, createEventDispatcher } from "svelte";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import Button, { Label } from "@smui/button";
  import CircularProgress from "@smui/circular-progress";
  import { Temporisador } from "../js/tools";
  import { store } from "../js/data";

  export let type: "temporizer" | "Cronometer" | undefined = undefined;
  export let closed = false;
  export let time = 10;
  export let progress = 0;
  export let status: "play" | "stop" = "stop";
  export let id;
  const TimerCounter = new Temporisador(time);
  const emit = createEventDispatcher();
  let once = false;

  function StartTimerTest() {
    const { start: startTimer, stop: stopTimer } = TimerCounter.start(progress);
    startTimer(({ detail: { time, total } }) => {
      if (status != "play") status = "play";
      progress = (time * 1) / total;
      store.edit(id, (a) => {
        a.progress = progress;
        return a;
      });
    });
    stopTimer((_) => {
      if (status != "stop") status = "stop";
      progress = 0;
      store.edit(id, (a) => {
        a.progress = 0;
        return a;
      });
    });
  }
  function StopTimerTest() {
    TimerCounter.pause();
    if (status != "stop") status = "stop";
  }
  function clearTimerTest() {
    TimerCounter.clear();
  }
  store.once("del", () => {
    TimerCounter.pause();
    setTimeout(() => {
      if (status == "play") StartTimerTest();
    }, 500);
  });
  beforeUpdate(() => {
    if (once == false) {
      if (status == "play") StartTimerTest();
      else if (status == "stop") StopTimerTest();
      once = true;
    } else if (once == true && status == "stop") {
      once = false;
    }
  });
</script>

<Cell span={12} style="text-align:center;">
  <CircularProgress style="height: 200px; width: 200px;" {progress} {closed} />
</Cell>
<Cell span={12} style="text-align:center;">
  {#if type == "temporizer"}
    {#if status == "play"}
      <Button on:click={StopTimerTest}>
        <Label>Stop</Label>
      </Button>
      <Button on:click={clearTimerTest}>
        <Label>Clear</Label>
      </Button>
    {:else if status == "stop"}
      <Button on:click={StartTimerTest}>
        <Label>Start</Label>
      </Button>
    {/if}
  {/if}
</Cell>
