<script lang="ts">
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

  export let id;
  export let state: "play" | "pause" | "stop" = "stop";
  export let size = 1;
  export let type: "Bote Negro" | "Bote dorado" | "Bote de aluminio" =
    "Bote Negro";
  export let time = 1;
  export let action;
  export let textBtnSubmit = "submit";

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
  <Cell span={12}>
    {id}
  </Cell>
  <!-- <Cell span={6}>
    <Select bind:value={type} label="Type">
      {#each Types as item}
        <Option value={item}>{item}</Option>
      {/each}
    </Select>
  </Cell> -->
  <!-- <Cell span={6}>
    <Textfield bind:value={size} label="Size" suffix="g" type="number" />
  </Cell> -->
  <Cell span={12}>
    <Textfield bind:value={time} label="Time" suffix="sec" type="number" />
  </Cell>
  <!-- <Cell span={6}>
    <Textfield
      bind:value={progress}
      label="Progress"
      suffix="sec"
      type="number"
    />
  </Cell> -->
  <Cell span={12}>
    <Button on:click={(evt) => action({ id, state, time, size, type })}>
      <Label>{textBtnSubmit}</Label>
    </Button>
    <slot name="moreBtn" />
  </Cell>
</LayoutGrid>
