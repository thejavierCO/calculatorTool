<script lang="ts">
  import { beforeUpdate, createEventDispatcher, onDestroy } from "svelte";
  export let seconds: number = 0;
  export let posicion: number | undefined = undefined;
  export let status: "play" | "stop" | "pause" = "stop";
  export let CPS = 6;
  const time = seconds * 1000;
  const interval = 1000 / CPS;
  const emit = createEventDispatcher();
  let temp;
  if (posicion >= time) posicion = 0;
  let clear = () => {
    status = "stop";
    posicion = 0;
    emit("Status", { status });
    emit("Play", { posicion: posicion, time });
  };
  let calc = () => {
    if (!temp || status == "stop") {
      if (temp && status == "stop") clearInterval(temp);
      status = "play";
      temp = setInterval(() => {
        if (posicion < time) {
          if (status == "play") posicion = posicion + interval;
          emit("Play", { posicion: posicion, time });
          emit("Status", { status });
        } else if (posicion >= time) {
          posicion = 0;
          status = "stop";
          emit("Play", { posicion: posicion, time });
          emit("Status", { status });
          clearInterval(temp);
        }
      }, interval);
      emit("Status", { status });
    } else {
      clearInterval(temp);
      temp = false;
      if (posicion < time) status = "pause";
      emit("Status", { status });
    }
  };
  beforeUpdate(() => {
    if (!temp && status == "play") calc();
    else if (temp && status == "play")
      console.log(status, posicion, time, interval, temp);

    // if (status == "play") {
    //   if (once == false) {
    //     status = "stop";
    //     calc();
    //     once = true;
    //   }
    // } else if (status == "pause") {
    //   console.log(status);
    // }
  });
  onDestroy(() => clearInterval(temp));
</script>

<slot {time} {posicion} {status} start={calc} {clear}>
  <p>Start:{time}</p>
  <p>Posicion:{posicion}</p>
  <p>status:{status}</p>
  {#if status == "play"}
    <button on:click={calc}>
      {status == "play" ? "pause" : "play"}
    </button>
  {:else}
    <button on:click={calc}> play </button>
  {/if}
</slot>
