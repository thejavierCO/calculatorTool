<script lang="ts">
  import type { ITime, IStatus, IActions, IMillis } from "../types";
  import type { Readable, Unsubscriber } from "svelte/store";
  import { ConutTime } from "../js/data";
  
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  
  export let time: ITime = { start: 0, pause: 0, end: 0 };
  export let status: IStatus = "Stop";
  export let posicion: Readable<number> = new ConutTime().Time;
  export let seconds = 1;
  
  let millis: IMillis = seconds * 1000;
  let emit = createEventDispatcher();
  let pos = 0;
  let control: IActions = {
    play: () => {
      status = "Play";
      emit("play")
    },
    pause: () => {
      status = "Pause"
      emit("pause")
    },
    stop: () => {
      status = "Stop";
      emit("stop")
    },
  };

  let unsus: Unsubscriber = posicion.subscribe((data)=>{
    if(status=="Play"){
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
      pos = ((a) => (a < 0 ? 0 : a))(time.end - data);
      if (time.end - time.start < 0 || data > time.end || pos == 0)status = "Stop"
    }else if(status=="Pause"){
      if (time.pause == 0) time.pause = data;
    }else if(status=="Stop"){
      time.start = 0;
      time.pause = 0;
      time.end = 0;
      pos = 0;
    }
    emit("time",{time})
  })

  onMount(() => {
    if (pos == 0) emit("stop");
  });
  
  onDestroy(() => {
    if (typeof unsus == "function") {
      unsus();
      emit("destroy",{time})
    }
  });
</script>

<slot actions={control}>
  {status}<br>
  {pos}<br>
  {JSON.stringify(time)}<br>
  <button on:click={() => control.play()}>play</button>
  <button on:click={() => control.pause()}>pause</button>
  <button on:click={() => control.stop()}>stop</button>
</slot>
