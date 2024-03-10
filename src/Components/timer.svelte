<script lang="ts">
  import type { ITime, IStatus } from "../types";

  import { createEventDispatcher, onMount } from "svelte";
  import Counter from "./countInterval.svelte";

  let emit = createEventDispatcher();

  export let seconds: number = 1;
  export let time: ITime = { start: 0, pause: 0, end: 0 };
  export let autoRun = false;
  export let status: IStatus = "Stop";

  onMount(() => {
    if (autoRun) status = "Play";
  });
</script>

<Counter
  on:status={({ detail: status }) => emit("state", { status })}
  on:time={({ detail: { time } }) => emit("time", { time })}
  {status}
  {time}
  {seconds}
  let:current_time
  let:actions
>
  <slot
    btnPause={() => actions.pause()}
    btnStop={() => actions.stop()}
    btnPlay={() => actions.play()}
    {seconds}
    {autoRun}
    {status}
    {time}
    {current_time}
  />
</Counter>
