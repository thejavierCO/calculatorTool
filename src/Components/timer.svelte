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
  // const TimeInterval = seconds >= 60 ? 1000 : seconds >= 30 ? 100 : 10;
  const TimeInterval = 1000;

  const emit = createEventDispatcher();
  let interval;

  let loop = (posicion, fns) => {
    let start: Date | undefined;
    let end: Date | undefined;
    let p: number = 0;
    let inter = setInterval(() => {
      switch (status) {
        case "Play":
          if (!start) start = new Date();
          if (!end) end = new Date(start.getTime() + millis);
          if (start && end) {
            console.log(posicion, p);
            p = new Date().getTime();
            posicion = end.getTime() - p;
            console.log(posicion, p);
          }

          // if (posicion >= end.getTime()) status = "Stop";
          break;
        case "Pause":
          clearInterval(inter);
          break;
        case "Stop":
          posicion = 0;
          clearInterval(inter);
          break;
      }
      fns({ posicion, start, end });
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
      interval = loop(posicion, ({ posicion: timePosicion, start, end }) => {
        if (status == "Stop") interval = undefined;
        else if (status == "Pause") interval = undefined;
        posicion = timePosicion;
        // console.log(timePosicion, start, end);
      });
      emit("state", {
        status,
        seconds,
        posicion,
      });
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
