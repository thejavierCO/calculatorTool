<script>
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  export let time = { start: 0, pause: 0, end: 0 };
  export let status = "Stop";
  export let seconds = 1;
  export let autoRun = false;
  let emit = createEventDispatcher();
  let position = 0;
  const currentTime = ()=>new Date().getTime();
  const actions = {
    play: () => {
      if (status=="Play") return emit("Error","isPlaying");
      status = "Play";
      if (time.pause != 0) {
        let posPause = Math.round(time.pause - time.start),
          timePause = time.end - time.start,
          timeOff = timePause - posPause;
        time.start = currentTime();
        time.end = time.start + timeOff;
        time.pause = 0;
      } else if (time.pause == 0 || (time.start == 0 && time.end == 0)) {
        time.start = currentTime();
        time.end = time.start + seconds * 1000;
      }
      position = time.end - time.start;
      emit("Play");
      emit("Status", { time, status });
    },
    stop: () => {
      if (status=="Stop") return emit("Error","isStopped");
      status = "Stop";
      time = { start: 0, pause: 0, end: 0 };
      position = 0;
      emit("Stop");
      emit("Status", { time, status });
    },
    pause: () => {
      if (status=="Pause") return emit("Error","isPaused");
      status = "Pause";
      if (time.pause == 0) time.pause = currentTime();
      position = time.end - time.pause;
      emit("Pause");
      emit("Status", { time, status });
    },
  };
  
  let internalClock = (fns) => {
    const updateClock = (_) => {
      if (fns&&typeof fns == "function") fns(new Date().getTime());
      window.requestAnimationFrame(updateClock);
    };
    updateClock();
  };
  internalClock((t) => {
    if (status == "Play") {
      position = time.end - t;
      emit("Playing");
      if (position <= 0) actions.stop();
    } 
  });

  onMount(() => {
    if (autoRun) actions.play();
  });
</script>

<slot
  btnPlay={actions.play}
  btnStop={actions.stop}
  btnPause={actions.pause}
  {status}
  {position}
/>
