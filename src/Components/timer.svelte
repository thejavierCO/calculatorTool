<script lang="ts">
  type time = {
    start: number;
    end: number;
  };
  import {
    beforeUpdate,
    createEventDispatcher,
    onDestroy,
    onMount,
  } from "svelte";

  export let seconds: number = 1;
  export let time: time = { start: 0, end: 0 };
  // export let posicion: number = 0;
  export let autoRun = false;
  export let status: "Play" | "Pause" | "Stop" = "Stop";

  let millis = seconds * 1000;
  // const TimeInterval = seconds >= 60 ? 1000 : seconds >= 30 ? 100 : 10;
  const TimeInterval = 1000;

  const emit = createEventDispatcher();
  let interval;
  let loop = (time: time, fns) => {
    let { start, end } = time;
    let posicion: Date;
    let test;
    let inter = setInterval(() => {
      switch (status) {
        case "Play":
          if (start == 0 && end == 0) {
            start = new Date().getTime();
            end = new Date().getTime();
          }
          if (end == 0) {
            if (!posicion) posicion = new Date();
            else {
              end = new Date(
                posicion.getTime() + posicion.getTime() - start + millis
              ).getTime();
              start = posicion.getTime();
            }
          }
          break;
        case "Pause":
          end = 0;
          clearInterval(inter);
          break;
        case "Stop":
          start = 0;
          end = 0;
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
      interval = loop(time, ({ posicion, start, end }) => {
        if (status == "Stop") interval = undefined;
        else if (status == "Pause") interval = undefined;
        time = { start, end };
        // console.log(posicion, start, end);
      });
    }
    emit("state", {
      status,
      seconds,
      time,
    });
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
>
  <p>{seconds}</p>
  <p>{autoRun}</p>
</slot>
