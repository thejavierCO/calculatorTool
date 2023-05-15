<script lang="ts">
  import { beforeUpdate, createEventDispatcher, onDestroy } from "svelte";
  import type { ITime, IStatus, IFns, IMillis } from "../types";
  export let time: ITime;
  export let millis: IMillis;
  export let status: IStatus;
  let emit = createEventDispatcher();
  let posicion = 0;
  let interval;

  let actions = {
    start: (fns) =>
      new Promise((res, rej) => {
        if (!interval) {
          interval = setInterval(() => {
            let pos = new Date().getTime();
            if (status == "Pause" || status == "Stop") {
              if (status == "Pause") actions.pause();
              if (status == "Stop") actions.end();
              clearInterval(interval);
              interval = undefined;
            } else {
              if (time.start == 0) time.start = new Date().getTime();
              if (time.end == 0) {
                time.end = new Date(
                  time.start +
                    Math.round(
                      time.pause != 0
                        ? millis -
                            Math.round(
                              time.start < time.pause
                                ? time.pause - time.start
                                : time.start - time.pause
                            )
                        : millis
                    )
                ).getTime();
                if (time.pause != 0) time.pause = 0;
              }
              console.log(time.end - time.start, pos < time.end);
            }
            fns(time);
          }, 1000);
        } else rej({ error: "exist interval", interval });
      }),
    pause: () => {
      time.end = 0;
      time.pause = new Date().getTime();
      status = "Pause";
    },
    end: () => {
      time = { start: 0, pause: 0, end: 0 };
      status = "Stop";
    },
  };
  onDestroy(() => {
    if (interval) clearInterval(interval);
    interval = undefined;
  });
  beforeUpdate(() => {
    if (status == "Play") {
      actions
        .start((a) => console.log(a, status))
        .then((e) => console.log("end", e, status))
        .catch((e) => console.warn("error", e, status));
    }
  });
</script>

<slot {posicion}>{JSON.stringify(time)}</slot>
