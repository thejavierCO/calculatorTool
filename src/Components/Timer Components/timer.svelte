<script>
  import { createEventDispatcher, onMount, onDestroy ,beforeUpdate} from "svelte";
  import Timer from "./timer.js"
  let emit = createEventDispatcher();

  export let time = { start: 0, pause: 0, end: 0 };
  export let status = "Stop";
  export let seconds = 1;
  export let autoRun = false;

  let timer = new Timer(seconds * 1000,status,time);
  let position = timer.formatTime(0);

  timer.on("clock",({detail:t})=>position = timer.formatTime(t))
  timer.on("Status", ({target}) => {
    status = target.status;
    emit("Status", { status,time })
  })

  onMount(()=>{
    if(autoRun)timer.Play();
  })
  beforeUpdate(()=>{
    timer.updateTime(time);
    timer.updateStatus(status);
    timer.updateMiliseconds(seconds*1000);
  })
  onDestroy(()=>{timer.Destroy();})
</script>

<slot
  btnPlay={() => timer.Play()}
  btnStop={() => timer.Stop()}
  btnPause={() => timer.Pause()}
  {status}
  formatTime={position}
/>
