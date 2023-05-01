<script lang="ts">
  import type { ITime } from "../types";
  import { createEventDispatcher, onMount } from "svelte";

  import Select, { Option } from "@smui/select";
  import Textfield from "@smui/textfield";
  import Switch from "@smui/switch";
  import FormField from "@smui/form-field";
  import Checkbox from "@smui/checkbox";
  import Chip, { Set, Text } from "@smui/chips";
  import Button, { Label } from "@smui/button";
  import Radio from "@smui/radio";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  const emit = createEventDispatcher();

  export let id = "";
  export let status: "Play" | "Pause" | "Stop" = "Stop";
  export let seconds = 1;
  export let time: ITime = { start: 0, end: 0, count: 0 };
  export let btnSubmitText = "submit";

  let isSave = id ? true : false;
  onMount(() => {
    Array.from(
      document
        .querySelector("#awaitTime")
        .querySelectorAll("input[type='number']")
    ).map((e: HTMLInputElement) => {
      e.min = "0";
      return e;
    });
  });
</script>

<LayoutGrid style="padding:10px;" id="awaitTime">
  {#if id}
    <Cell span={12}>
      ID: {id}
    </Cell>
  {/if}
  <Cell span={12}>
    <Textfield
      bind:value={seconds}
      on:change={(_) => (id ? (isSave = false) : undefined)}
      label="Time"
      suffix="sec"
      type="number"
    />
  </Cell>
  <Cell span={12}>
    {#if isSave == false}
      <Button
        on:click={() => {
          isSave = id ? !isSave : false;
          emit("save", { id, status, seconds, time });
        }}
      >
        <Label>{btnSubmitText}</Label>
      </Button>
    {/if}
  </Cell>
</LayoutGrid>
