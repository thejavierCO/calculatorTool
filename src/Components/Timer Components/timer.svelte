<script>
  import {
    createEventDispatcher,
    onMount,
    onDestroy,
    beforeUpdate,
  } from "svelte";
  import Timer from "./timer.js";
  let emit = createEventDispatcher();

  export let time = { start: 0, pause: 0, end: 0 };
  export let status = "Stop";
  export let seconds = 1;
  export let autoRun = false;

  let timer = new Timer(seconds * 1000);
  let position = timer.formatTime;

  timer.time = time;
  timer.on("clock", (_) => (position = timer.formatTime));
  timer.on("Status", ({ target }) => {
    status = target.status;
    time = target.time;
    emit("Status", { status: target.status, time: target.time });
  });

  onMount(() => {
    if (autoRun) timer.status = "Play";
  });
</script>

<slot
  btnPlay={() => timer.Play()}
  btnStop={() => timer.Stop()}
  btnPause={() => timer.Pause()}
  {status}
  formatTime={position}
/>
