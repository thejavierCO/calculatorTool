<script lang="ts">
  import {
    beforeUpdate,
    createEventDispatcher,
    onDestroy,
    onMount,
  } from "svelte";
  import type { ITime, IStatus, IFns, IMillis } from "../types";
  import type { Readable, Unsubscriber } from "svelte/store";
  export let time: ITime;
  export let millis: IMillis;
  export let status: IStatus;
  let emit = createEventDispatcher();
  export let posicion: Readable<number>;
  let pos = 0;
  let unsus: Unsubscriber = posicion.subscribe((data) => {
    switch (status) {
      case "Play":
        if (time.start == 0) time.start = data;
        if (time.end == 0) time.end = time.start + millis;
        if (time.pause != 0) {
          let posPause = Math.round(time.pause - time.start);
          let timePause = time.end - time.start;
          time.start = data;
          time.end = time.start + timePause - posPause;
          time.pause = 0;
        }
        pos = ((a) => (a < 0 ? 0 : a))(time.end - data);
        if (time.end - time.start < 0 || data > time.end || pos == 0)
          emit("stop");
        break;
      case "Pause":
        if (time.pause == 0) time.pause = data;
        break;
      case "Stop":
        pos = 0;
        time.start = 0;
        time.pause = 0;
        time.end = 0;
        break;
    }
    emit("time", { time });
  });
  onMount(() => {
    if (pos == 0) emit("Stop");
  });
  onDestroy(() => {
    if (typeof unsus == "function") unsus();
  });
</script>

<slot posicion={pos}>{JSON.stringify(time)}</slot>
