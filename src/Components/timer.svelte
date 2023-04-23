<script lang="ts">
  import {
    beforeUpdate,
    createEventDispatcher,
    onDestroy,
    onMount,
  } from "svelte";

  export let seconds: number = 1;
  export let posicion: number = 0;
  export let autoRun = false;
  export let status: "Play" | "Pause" | "Stop" = "Stop";

  let millis = seconds * 1000;
  let start: Date | undefined;
  let end: Date | undefined;
  const TimeInterval = 1000 / 10;
  const emit = createEventDispatcher();
  let interval;

  let loop = (fns) => {
    let inter = setInterval(() => {
      fns({ posicion, id: inter, status });
      switch (status) {
        case "Play":
          if (!end) end = new Date(new Date().getTime() + millis);
          console.log(end, new Date());
          break;
        case "Pause":
          end = undefined;
          clearInterval(inter);
          break;
        case "Stop":
          clearInterval(inter);
          posicion = 0;
          start = undefined;
          end = undefined;
          break;
      }
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
    if (interval) clearInterval(interval);
  });
  beforeUpdate(() => {
    millis = seconds * 1000;
    if (status == "Play" && !interval) {
      interval = loop(() => {
        if (status == "Stop") interval = undefined;
        else if (status == "Pause") interval = undefined;
      });
      emit("state", { status, seconds, posicion });
    }
  });
</script>

{posicion} - {millis}<br />
<slot
  btnPause={acctions.pause}
  btnStop={acctions.stop}
  btnPlay={acctions.play}
  {seconds}
  {posicion}
  {autoRun}
  {status}
>
  <p>{seconds}</p>
  <p>{posicion}</p>
  <p>{autoRun}</p>
</slot>
