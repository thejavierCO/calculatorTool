<script lang="ts">
  import type { ITime, IActions, IStatus } from "../types";
  import type { Readable } from "svelte/store";
  
  import { createEventDispatcher, onMount } from "svelte";
  import Counter from "./countInterval.svelte";
  import { ConutTime } from "../js/data";

  export let seconds: number = 1;
  export let time: ITime = { start: 0, pause: 0, end: 0 };
  export let autoRun = false;
  export let status: IStatus = "Stop";
  export let posicion: Readable<number> = new ConutTime().Time;

  let millis = seconds * 1000;

  const emit = createEventDispatcher();

  let acctions: IActions = {
    play: () => {
      status = "Play";
      emit("state", { status });
    },
    pause: () => {
      status = "Pause";
      emit("state", { status });
    },
    stop: () => {
      status = "Stop";
      emit("state", { status });
    },
  };

  onMount(() => {
    if (autoRun) acctions.play();
  });
</script>

<Counter
  bind:status
  {time}
  {millis}
  {posicion}
  let:posicion
  on:stop={(_) => acctions.stop()}
  on:time={({ detail }) => emit("time", detail)}
>
  <slot
    btnPause={acctions.pause}
    btnStop={acctions.stop}
    btnPlay={acctions.play}
    {seconds}
    {autoRun}
    {status}
    {time}
    posicion={(Maxtotal = 100, MaxDecimal = 0) =>
      parseFloat(((posicion * Maxtotal) / millis).toString()).toFixed(
        MaxDecimal
      )}
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
