<script lang="ts">
  import {
    createEventDispatcher,
    onMount,
    beforeUpdate,
    onDestroy,
  } from "svelte";
  export let seconds: number = 0;
  export let posicion: number | undefined = undefined;
  export let status: "play" | "stop" | "pause" = "stop";
  export let CPS = 10;
  const time = seconds * 1000;
  const interval = 1000 / CPS;
  const emit = createEventDispatcher();
  let temp;
  // let progress = posicion ? posicion : 0;
  let calc = () => {
    if (status == "play") status = "pause";
    else {
      status = "play";
      emit("Status", { status });
      if (!temp) {
        temp = setInterval(() => {
          if (posicion < time) {
            if (status == "play") {
              posicion = posicion + interval;
              emit("Play", { posicion: posicion, time });
            } else if (status == "pause") {
              clearInterval(temp);
              emit("Status", { status });
            }
          } else if (posicion >= time) {
            clearInterval(temp);
            posicion = 0;
            status = "stop";
            emit("Status", { status });
          }
        }, interval);
      } else console.log("exist", temp);
    }
  };
  // let once = false;
  // onMount(() => {
  //   if (status == "play") {
  //     status = "pause";
  //     calc();
  //   }
  //   if (posicion >= time) posicion = 0;
  // });
  // beforeUpdate(() => {
  //   if (status == "play") {
  //     status = "pause";
  //     calc();
  //   }
  // });
  // onDestroy(() => {
  //   status = "stop";
  // });
</script>

<slot {time} {posicion} {status} start={calc}>
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
