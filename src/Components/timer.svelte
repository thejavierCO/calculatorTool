<script lang="ts">
  type time = {
    start: number;
    end: number;
    lastPosicion: number;
  };
  import {
    beforeUpdate,
    createEventDispatcher,
    onDestroy,
    onMount,
  } from "svelte";

  export let seconds: number = 1;
  export let time: time = { start: 0, end: 0, lastPosicion: 0 };
  export let posicion: number = 0;
  export let autoRun = false;
  export let status: "Play" | "Pause" | "Stop" = "Stop";

  let millis = seconds * 1000;
  const TimeInterval = seconds >= 60 ? 900 : seconds >= 30 ? 100 : 10;
  // const TimeInterval = 1000;

  const emit = createEventDispatcher();
  let interval;
  let loop = (time: time, fns) => {
    let posicion: number;
    let inter = setInterval(() => {
      switch (status) {
        case "Play":
          if (!time.lastPosicion) {
            posicion = new Date().getTime();
            if (time.start == 0 && time.end == 0) {
              time.start = new Date().getTime();
              time.end = new Date(time.start + millis).getTime();
            }
            if (posicion >= time.end) status = "Stop";
          } else {
            time.start = new Date().getTime();
            time.end = new Date(
              time.start + (time.end - time.lastPosicion)
            ).getTime();
            time.lastPosicion = 0;
          }
          break;
        case "Pause":
          time.lastPosicion = new Date().getTime();
          clearInterval(inter);
          break;
        case "Stop":
          time.start = 0;
          time.end = 0;
          clearInterval(inter);
          break;
      }
      fns(time);
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
      interval = loop(time, (a) => {
        if (status == "Stop") interval = undefined;
        else if (status == "Pause") interval = undefined;
        posicion = ((a) => (a < 0 ? 0 : a))(time.end - new Date().getTime());
        emit("state", {
          status,
          seconds,
          time,
          posicion,
        });
      });
    }
  });
</script>

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
