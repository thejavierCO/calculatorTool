<script lang="ts">
  import type { ITime, IStatus, IActions, IMillis } from "../types";
  import type { Readable, Unsubscriber } from "svelte/store";
  import { ConutTime } from "../js/data";

  import { createEventDispatcher, onDestroy } from "svelte";

  export let time: ITime = { start: 0, pause: 0, end: 0 };
  export let status: IStatus = "Stop";
  export let seconds = 1;

  let millis: IMillis = seconds * 1000;
  let emit = createEventDispatcher();
  let posicion: Readable<number> = new ConutTime().Time;
  let current_time = 0;
  let control: IActions = {
    play: (data) => {
      status = "Play";
      emit("status", "Play");
      if (data) {
        if (time.start == 0) time.start = data;
        if (time.end == 0) time.end = time.start + millis;
        if (time.pause != 0) {
          let posPause = Math.round(time.pause - time.start),
            timePause = time.end - time.start,
            timeOff = timePause - posPause;
          time.start = data;
          time.end = time.start + timeOff;
          time.pause = 0;
        }
        current_time = ((a) => (a < 0 ? 0 : a))(time.end - data);
        if (time.end - time.start < 0 || data > time.end || current_time == 0)
          control.stop();
        emit("time", { time });
      }
    },
    pause: (data) => {
      status = "Pause";
      if (data && time.pause == 0) {
        time.pause = data;
        emit("status", "Pause");
      }
    },
    stop: (forceUpdate) => {
      if (status != "Stop") emit("status", "Stop");
      if (forceUpdate) emit("status", "Stop");
      status = "Stop";
      time.start = 0;
      time.pause = 0;
      time.end = 0;
      current_time = 0;
    },
  };

  let unsus: Unsubscriber = posicion.subscribe((data) => {
    if (status == "Play") control.play(data);
    else if (status == "Pause") control.pause(data);
    else if (status == "Stop") control.stop(true);
  });

  onDestroy(() => unsus());
</script>

<slot actions={control} {current_time} />
