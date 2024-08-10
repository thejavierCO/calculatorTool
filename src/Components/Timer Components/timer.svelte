<script>
  import { createEventDispatcher, onMount, onDestroy } from "svelte";
  import {Clock, timeFormat} from "./timer.js"
  let emit = createEventDispatcher();

  export let time = { start: 0, pause: 0, end: 0 };
  export let status = "Stop";
  export let seconds = 1;
  export let autoRun = false;
  
  const Millis = seconds*1000;
  const clock = new Clock();
  let current = 0;
  let position = new timeFormat(0);

  const Destroy = clock.subscribe((t)=>{
    current = t;
    if(status=="Play"){
      if(time.pause==0){
        if(time.start != 0&&time.end != 0){
          if(current >= time.end)status = "Stop";
          else position = new timeFormat(time.end-current);
        }else if(time.start == 0&&time.end == 0){
          time.start = current;
          time.end = time.start + Millis;
          emit("Status",{status,time})
          emit("Play",{time})
        }
      }else if(time.start != 0&&time.end != 0){
        let posPause = Math.round(time.pause - time.start),
          timePause = time.end - time.start,
          timeOff = timePause - posPause;
        time.start = current;
        time.end = time.start + timeOff;
        time.pause = 0;
      }
    }else if(status == "Pause"){
      if(time.pause==0){
        time.pause = current;
        emit("Status",{status,time})
        emit("Pause",{time})
      }
    }else if(status == "Stop"){
      time.start = 0;
      time.end = 0;
      time.pause = 0;
      position = new timeFormat(0);
      emit("Status",{status,time})
      emit("Stop",{time})
    }
  });

  onMount(()=>{
    if(autoRun)status = "Play";
  })
  onDestroy(()=>{Destroy();})
</script>

<slot
  btnPause={() => status = "Pause"}
  btnPlay={() => status = "Play"}
  btnStop={() => status = "Stop"}
  {status}
  formatTime={position}
/>
