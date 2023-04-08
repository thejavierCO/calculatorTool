<script lang="ts">
  import { beforeUpdate, createEventDispatcher, onDestroy } from "svelte";
  export let seconds: number = 0;
  export let posicion: number | undefined = undefined;
  export let status: "play" | "stop" | "pause" = "stop";
  export let CPS = 10;
  if (seconds > 30) CPS = 3;
  else if (seconds > 60) CPS = 2;
  else if (seconds > 120) CPS = 1;
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
  let test = 0;
  beforeUpdate(() => {
    if (!temp && status == "play") calc();
    else if (temp && status == "play") {
      if (test == 0) {
        test = posicion;
        let testingstop = setTimeout(() => {
          if (temp && posicion == test) {
            clearInterval(temp);
            clearTimeout(testingstop);
          }
          test = 0;
        }, 1000);
      }
    }
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
