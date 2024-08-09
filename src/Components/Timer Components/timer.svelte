<script>
  import { createEventDispatcher, onMount, onDestroy } from "svelte";
  import { Temporizador } from "./data";
  let emit = createEventDispatcher();

  export let time = { start: 0, pause: 0, end: 0 };
  export let status = "Stop";
  export let seconds = 1;
  export let autoRun = false;

  let Counter = new Temporizador(seconds * 1000, time, status);

  let posicion = Counter.formatTime;
  Counter.on("current_status_timer", ({ detail }) => {
    if (status != detail.status) {
      emit("state", { data: detail });
      if (detail.status == "Stop") emit("isStop");
      if (detail.status == "Play") emit("isPlay");
      if (detail.status == "Pause") emit("isPause");
      status = detail.status;
    }
    posicion = Counter.formatTime;
  });

  onMount(() => {
    if (autoRun) {
      if (status != "Play") return Counter.play();
    }
  });

  onDestroy(() => Counter.Destroy());
</script>

<slot
  btnPause={() => Counter.pause()}
  btnStop={() => Counter.stop()}
  btnPlay={() => Counter.play()}
  {status}
  formatTime={posicion}
/>
