<script lang="ts">
  import { beforeUpdate, createEventDispatcher, onDestroy } from "svelte";
  import type { ITime, IStatus, IFns, IMillis } from "../types";
  export let time: ITime;
  export let millis: IMillis;
  export let status: IStatus;
  let interval;
  let emit = createEventDispatcher();
  let posicion = 0;
  let loop = (fns: IFns) => {
    let inter = setInterval(() => {
      let pos = new Date().getTime();
      if (status == "Play") {
        if (time.start == 0) time.start = pos;
        if (time.end == 0) time.end = pos + millis;
        if (time.pause != 0) {
          time.start = pos;
          time.end =
            pos +
            Math.round(
              time.end - Math.round(time.pause != 0 ? time.pause : time.start)
            );
          time.pause = 0;
        }
        if (pos > time.end) status = "Stop";
      } else if (status == "Pause" || status == "Stop") {
        if (status == "Pause") time.pause = pos;
        if (status == "Stop") {
          time.start = 0;
          time.end = 0;
          time.pause = 0;
        }
        clearInterval(inter);
      }
      fns(time);
    }, 100);
    return inter;
  };
  onDestroy(() => {
    if (interval) clearInterval(interval);
  });
  beforeUpdate(() => {
    if (status == "Play" && !interval) {
      interval = loop((a) => {
        if (status == "Pause" || status == "Stop") interval = undefined;
        posicion = a.end - new Date().getTime();
        if (posicion < 0) posicion = 0;
        emit("time", { time, posicion });
      });
    }
  });
</script>

<slot {posicion}>{JSON.stringify(time)}</slot>
