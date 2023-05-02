<script lang="ts">
  import type { ITime, IActions, IStatus } from "../types";
  import {
    beforeUpdate,
    createEventDispatcher,
    onDestroy,
    onMount,
  } from "svelte";
  import Counter from "./countInterval.svelte";

  export let seconds: number = 1;
  export let time: ITime = { start: 0, end: 0, count: 0 };
  export let autoRun = false;
  export let status: IStatus = "Stop";

  let millis = seconds * 1000;

  const emit = createEventDispatcher();

  let acctions: IActions = {
    play: () => {
      status = "Play";
      if (time.end == 0 && time.start == 0) {
        time.start = new Date().getTime();
        time.end = new Date(time.start + millis).getTime();
      }
      if (time.end == 0 && time.count != 0) {
        time.start = new Date().getTime();
        time.end = new Date(time.start + time.count).getTime();
      }
    },
    pause: () => {
      status = "Pause";
      time.end = 0;
    },
    stop: () => {
      time.start = 0;
      time.end = 0;
      time.count = 0;
      status = "Stop";
    },
  };

  onMount(() => {
    if (autoRun) acctions.play();
  });

  beforeUpdate(() => {
    emit("state", {
      status,
      seconds,
      time,
    });
  });
</script>

<Counter bind:status {time} bind:acctions let:posicion>
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
    <p>{seconds}</p>
    <p>{autoRun}</p>
  </slot>
</Counter>
