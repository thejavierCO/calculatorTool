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
    start: () =>
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
                  Math.round(
                    time.pause != 0 ? new Date().getTime() : time.start
                  ) +
                    Math.round(
                      time.pause != 0
                        ? millis - Math.round(time.pause - time.start)
                        : millis
                    )
                ).getTime();
                console.warn(Math.round(time.pause - time.start));
                if (time.pause != 0) time.pause = 0;
              }
            }
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
      actions.start().catch(() => console.warn("_"));
    }
  });
</script>

<slot {posicion}>{JSON.stringify(time)}</slot>
