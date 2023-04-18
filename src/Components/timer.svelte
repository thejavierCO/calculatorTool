<script lang="ts">
  import {
    beforeUpdate,
    createEventDispatcher,
    onDestroy,
    onMount,
  } from "svelte";
  export let time: number;
  export let start: number = 0;
  export let autoRun = false;
  if (!time) time = 1;

  let CalcPeerSecond = 10;
  if (time > 30) CalcPeerSecond = 3;
  else if (time > 60) CalcPeerSecond = 2;
  else if (time > 120) CalcPeerSecond = 1;

  const Time = time * 1000;
  const TimeInterval = 1000 / CalcPeerSecond;
  let interval;

  let loop = (fns) => {
    let inter = setInterval(() => fns(inter), TimeInterval);
    return (fns) => {
      clearInterval(inter);
      return fns;
    };
  };
</script>

<p>{time}</p>
<p>{start}</p>
<p>{autoRun}</p>
