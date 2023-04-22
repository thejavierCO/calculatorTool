<script lang="ts">
  import {
    createEventDispatcher,
    onMount,
    afterUpdate,
    beforeUpdate,
  } from "svelte";

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
  export let status: "Play" | "Pause" | "Stop" = "Stop";
  export let time = 1;
  export let start = 0;
  export let action;
  export let textBtnSubmit = "submit";

  let data = { id, status, time, start, action, textBtnSubmit };
  let isChange = false;
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
  afterUpdate(() => {
    let newData = { id, status, time, start, action, textBtnSubmit };
    // let changeData = Object.keys(data).filter((k) => newData[k] != data[k]);
    // if (changeData.length > 0) {
    //   isChange = true;
    //   data = newData;
    // } else isChange = false;

    emit("change", newData);
  });
</script>

<LayoutGrid style="padding:10px;" id="awaitTime">
  <Cell span={12}>
    ID: {id}
  </Cell>
  <Cell span={12}>
    <Textfield bind:value={time} label="Time" suffix="sec" type="number" />
  </Cell>
  <Cell span={12}>
    Posicion: {start}
  </Cell>
  <Cell span={12}>
    <slot
      name="btnSubmit"
      componentBtn={{ Button, Label }}
      action={(_) => action({ id, status, time, start })}
    >
      <Button
        on:click={(evt) => {
          action({ id, status, time, start });
        }}
      >
        <Label>{textBtnSubmit}</Label>
      </Button>
    </slot>
  </Cell>
</LayoutGrid>
