<script lang="ts">
  import type { ITime, IActions, IStatus } from "../types";
  import {
    beforeUpdate,
    afterUpdate,
    createEventDispatcher,
    onDestroy,
    onMount,
  } from "svelte";
  import Counter from "./countInterval.svelte";

  export let seconds: number = 1;
  export let time: ITime = { start: 0, pause: 0, end: 0 };
  export let autoRun = false;
  export let status: IStatus = "Stop";

  let millis = seconds * 1000;

  const emit = createEventDispatcher();

  let acctions: IActions = {
    play: () => {
      status = "Play";
    },
    pause: () => {
      status = "Pause";
    },
    stop: () => {
      status = "Stop";
    },
  };

  onMount(() => {
    if (autoRun) acctions.play();
  });

  afterUpdate(() => {
    emit("state", { status });
  });
</script>

<Counter
  bind:status
  {time}
  {millis}
  let:posicion
  on:time={({ detail }) => emit("time", detail.time)}
>
  <slot
    btnPause={acctions.pause}
    btnStop={acctions.stop}
    btnPlay={acctions.play}
    {seconds}
    {autoRun}
    {status}
    {time}
    {posicion}
  >
    <p>{autoRun ? "AutoRun" : ""}</p>
    <p>{JSON.stringify(seconds)}</p>
    <p>{JSON.stringify(status)}</p>
    <p>{JSON.stringify(time)}</p>
    <p>{JSON.stringify(posicion)}</p>
    <button on:click={() => acctions.play()}>play</button>
    <button on:click={() => acctions.pause()}>pause</button>
    <button on:click={() => acctions.stop()}>stop</button>
  </slot>
</Counter>
