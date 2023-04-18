<script lang="ts">
  import {
    beforeUpdate,
    createEventDispatcher,
    onDestroy,
    onMount,
  } from "svelte";
  export let time: number;
  export let start: number = 0;
  export let autoRun = false;
  export let status: "Play" | "Pause" | "Stop" = "Stop";
  if (!time) time = 1;

  let CalcPeerSecond = 10;
  if (time > 30) CalcPeerSecond = 3;
  else if (time > 60) CalcPeerSecond = 2;
  else if (time > 120) CalcPeerSecond = 1;

  const TimeInterval = 1000 / CalcPeerSecond;
  let Time = time * 1000;
  let interval;

  let loop = (fns) => {
    let inter = setInterval(() => {
      status = "Play";
      if (start > Time) clearInterval(inter);
      start = start + TimeInterval;
      fns({ start, id: inter });
    }, TimeInterval);
    return inter;
  };
  onMount(() => {
    if (autoRun) {
      interval = loop(({ start, id }) => {
        console.log(start);
      });
    }
  });
  beforeUpdate(() => {
    Time = time * 1000;
    if (interval && start > Time) {
      clearInterval(interval);
      interval = undefined;
    }
    if (!interval && start < Time)
      interval = loop(({ start, id }) => {
        console.log(start);
      });
    console.log(autoRun, Time, time, start, interval);
  });
</script>

<p>{time}</p>
<p>{start}</p>
<p>{autoRun}</p>
