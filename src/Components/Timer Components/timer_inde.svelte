<script>
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  let emit = createEventDispatcher();

  export let time = { start: 0, pause: 0, end: 0 };
  export let status = "Stop";
  export let seconds = 1;
  export let autoRun = false;

  export class timeFormat {
    constructor(TimeMillis) {
      this._current_time = TimeMillis;
    }
    get current() {
      return this._current_time;
    }
    get Hours() {
      return new String(
        Math.trunc(this.current / 1000 / 60 / 60) % 60
      ).padStart(2, "0");
    }
    get Minutes() {
      return new String(Math.trunc(this.current / 1000 / 60) % 60).padStart(
        2,
        "0"
      );
    }
    get Seconds() {
      return new String(Math.trunc(this.current / 1000) % 60).padStart(2, "0");
    }
    get Miliseconds() {
      return new String(Math.trunc(this.current)).padEnd(4, "0");
    }
    useRange(max) {
      return Number(
        parseFloat(((this.current * 1) / (max * 1000)).toString()).toFixed(3)
      );
    }
  }

  let position = 0;

  let internalClock = (fns) => {
    const updateClock = (_) => {
      if (fns) fns(new Date().getTime());
      window.requestAnimationFrame(updateClock);
    };
    updateClock();
    return () => window.requestAnimationFrame(updateClock);
  };
  const actions = {
    play: () => {
      status = "Play";
      const currentTime = new Date().getTime();
      if (time.pause != 0) {
        let posPause = Math.round(time.pause - time.start),
          timePause = time.end - time.start,
          timeOff = timePause - posPause;
        time.start = currentTime;
        time.end = time.start + timeOff;
        time.pause = 0;
      } else if (time.pause == 0 || (time.start == 0 && time.end == 0)) {
        time.start = currentTime;
        time.end = time.start + seconds * 1000;
      }
      if (time.start != 0 && time.end != 0) console.warn("currentPlay", time);
      position = time.end - time.start;
      emit("Play");
      emit("Status", { time, status });
    },
    stop: () => {
      if (time.start == 0 && time.end == 0) console.warn("currentStop");
      status = "Stop";
      time = { start: 0, pause: 0, end: 0 };
      position = 0;
      emit("Stop");
      emit("Status", { time, status });
    },
    pause: () => {
      status = "Pause";
      const currentTime = new Date().getTime();
      if (time.pause == 0) time.pause = currentTime;
      else console.warn("currentPause");
      position = time.end - time.pause;
      emit("Pause");
      emit("Status", { time, status });
    },
  };
  let close = internalClock((t) => {
    if (status == "Play") {
      emit("Playing");
      position = time.end - t;
      if (position <= 0) actions.stop();
    } else if (status == "Stop" && position != 0) {
      position = 0;
    }
  });
  onMount(() => {
    if (autoRun) actions.play();
  });
  onDestroy(() => close());
</script>

<slot
  btnPlay={actions.play}
  btnStop={actions.stop}
  btnPause={actions.pause}
  {status}
  formatTime={() => new timeFormat(position)}
/>
