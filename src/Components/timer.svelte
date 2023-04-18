<script lang="ts">
  import { beforeUpdate, createEventDispatcher, onDestroy } from "svelte";

  export let data: { state: string; time: number; size: number; type: string };
  let CalcPeerSecond = 10;

  if (data.time > 30) CalcPeerSecond = 3;
  else if (data.time > 60) CalcPeerSecond = 2;
  else if (data.time > 120) CalcPeerSecond = 1;
</script>
