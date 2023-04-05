<script lang="ts">
  import {
    onMount,
    createEventDispatcher,
    beforeUpdate,
    afterUpdate,
  } from "svelte";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import Button, { Label } from "@smui/button";
  import CircularProgress from "@smui/circular-progress";
  import { Temporisador } from "../js/tools";
  import { store } from "../js/data";

  export let type: "temporizer" | "Cronometer" | undefined = undefined;
  export let closed = false;
  export let time = 10;
  export let progress = 0;
  export let status = false;
  export let id;
  const TimerCounter = new Temporisador(time);
  const emit = createEventDispatcher();

  function TimerTest() {
    const { start: startTimer, stop: stopTimer } = TimerCounter.start(progress);
    startTimer(({ detail: { time, total } }) => {
      status = true;
      progress = (time * 1) / total;
      store.edit(id, (a) => {
        a.progress = progress;
        return a;
      });
      emit("start");
    });
    stopTimer((_) => {
      status = false;
      progress = 0;
      store.edit(id, (a) => {
        a.progress = 0;
        return a;
      });
      emit("stop");
    });
  }
  function StopTimerTest() {
    TimerCounter.pause();
    status = false;
    emit("pause");
  }
  function clearTimerTest() {
    TimerCounter.clear();
    status = false;
    emit("clear");
  }
  let once = false;
  onMount(() => {
    if (status == true) TimerTest();
    else StopTimerTest();
  });
  // beforeUpdate(() => {
  //   if (isMount == true) {
  //     if (once == true && status == false) {
  //       once = false;
  //     } else if (once == false && status == true) {
  //       once = true;
  //     }
  //   }
  // });
  // store.once("del", () => {
  //   if (status == true) {
  //     TimerCounter.pause();
  //   }
  // });
  // once((a) => {
  //   console.log(a);
  // });
</script>

<Cell span={12}>
  <p>{id}</p>
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
      <Button on:click={() => (status = false)}>
        <Label>Stop</Label>
      </Button>
      <Button on:click={clearTimerTest}>
        <Label>Clear</Label>
      </Button>
    {:else}
      <Button on:click={() => (status = true)}>
        <Label>Start</Label>
      </Button>
    {/if}
  {/if}
</Cell>
