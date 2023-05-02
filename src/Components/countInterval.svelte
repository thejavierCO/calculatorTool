<script lang="ts">
  import {
    beforeUpdate,
    createEventDispatcher,
    onDestroy,
    onMount,
  } from "svelte";
  import type { ITime, IStatus, IActions } from "../types";
  export let time: ITime;
  export let status: IStatus;
  export let acctions: IActions;
  let interval;
  let emit = createEventDispatcher();
  let posicion = 0;
  let loop = (fns: (time: ITime) => void) => {
    let inter = setInterval(() => {
      fns(time);
      if (status == "Pause" || status == "Stop") return clearInterval(inter);
      let pos = new Date().getTime();
      if (time.end != 0) time.count = ((a) => (a < 0 ? 0 : a))(time.end - pos);
      if (time.end - pos < 0) {
        acctions.stop();
      }
    }, 100);
    return inter;
  };
  onDestroy(() => {
    if (interval) clearInterval(interval);
  });
  beforeUpdate(() => {
    if (status == "Play" && !interval) {
      interval = loop((a) => {
        if (status == "Pause" || status == "Stop") {
          interval = undefined;
        }
        posicion = a.count < 0 ? 0 : a.count;
      });
    }
  });
</script>

<slot {posicion}>{JSON.stringify(time)}</slot>
