<script lang="ts">
  import type { ITime, IActions, IStatus } from "../types";
  
  import { createEventDispatcher, onMount } from "svelte";
  import Counter from "./countInterval.svelte";

  export let seconds: number = 1;
  export let time: ITime = { start: 0, pause: 0, end: 0 };
  export let autoRun = false;
  export let status: IStatus = "Stop";

  onMount(() => {
    if (autoRun) status = "Play"
  });
</script>

<Counter
  {time}
  {seconds}
/>


<!-- <Counter
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
</Counter> -->
