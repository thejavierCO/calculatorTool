<script lang="ts">
  import {
    beforeUpdate,
    createEventDispatcher,
    onDestroy,
    onMount,
  } from "svelte";
  export let time: number = 1;
  export let start: number = 0;
  export let autoRun = false;
  export let status: "Play" | "Pause" | "Stop" = "Stop";

  const TimeInterval = 1000 / 10;
  const emit = createEventDispatcher();
  let Time = time * 1000;
  let interval;

  let loop = (fns) => {
    let inter = setInterval(() => {
      switch (status) {
        case "Play":
          start = start + TimeInterval;
          if (start > Time) status = "Stop";
          break;
        case "Pause":
          clearInterval(inter);
          break;
        case "Stop":
          clearInterval(inter);
          start = 0;
          break;
      }
      fns({ start, id: inter, status });
    }, TimeInterval);
    return inter;
  };
  let acctions = {
    play: () => (status = "Play"),
    pause: () => (status = "Pause"),
    stop: () => (status = "Stop"),
  };
  onMount(() => {
    if (autoRun) status = "Play";
  });
  onDestroy(() => {
    if (interval) {
      clearInterval(interval);
    }
  });
  beforeUpdate(() => {
    Time = time * 1000;
    if (status == "Play" && !interval) {
      interval = loop(({ status }) => {
        if (status == "Stop") interval = undefined;
        else if (status == "Pause") interval = undefined;
        emit("state", { status, time, start });
      });
    } else emit("warn", { type: "is running" });
  });
</script>

<slot
  btnPause={acctions.pause}
  btnStop={acctions.stop}
  btnPlay={acctions.play}
  {time}
  {start}
  {autoRun}
  {status}
>
  <p>{time}</p>
  <p>{start}</p>
  <p>{autoRun}</p>
</slot>
