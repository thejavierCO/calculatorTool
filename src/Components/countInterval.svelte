<script lang="ts">
  import { beforeUpdate, createEventDispatcher, onDestroy } from "svelte";
  import type { ITime, IStatus, IFns, IMillis } from "../types";
  export let time: ITime;
  export let millis: IMillis;
  export let status: IStatus;
  let emit = createEventDispatcher();
  let posicion = 0;
  let interval;
  /*let loop = (runing: IFns | void) => {
    let interval;
    return new Promise((res, rej) => {
      if (!interval) {
        interval = setInterval(() => {
          let pos = new Date().getTime();
          if (status == "Play") {
            if (time.start == 0) time.start = pos;
            if (time.end == 0) time.end = pos + millis;
            if (time.pause != 0) {
              time.start = pos;
              time.end =
                pos +
                Math.round(
                  time.end -
                    Math.round(time.pause != 0 ? time.pause : time.start)
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
            clearInterval(interval);
            interval = undefined;
            res({ time, status });
          }
          if (runing) runing(time);
        }, 100);
      } else rej({ error: "not duplicate interval" });
    });
  };*/
  beforeUpdate(() => {
    if (status == "Play") {
      /*loop((e) => {
        posicion = e.end - new Date().getTime();
        if (posicion < 0) posicion = 0;
        emit("time", { time, posicion });
      })
        .then((e) => {
          console.log(e);
        })
        .catch((e) => {
          console.warn(e);
        });*/
    }
  });
</script>

<slot {posicion}>{JSON.stringify(time)}</slot>
