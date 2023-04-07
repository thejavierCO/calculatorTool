<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Select, { Option } from "@smui/select";
  import Textfield from "@smui/textfield";
  import Switch from "@smui/switch";
  import FormField from "@smui/form-field";
  import Checkbox from "@smui/checkbox";
  import Chip, { Set, Text } from "@smui/chips";
  import Button, { Label } from "@smui/button";
  import Radio from "@smui/radio";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import { v4 as uuidv4 } from "uuid";
  export let Types;
  const emit = createEventDispatcher();
  let size = "";
  let type = "";
  let id = uuidv4();
  let time = 0;
  function Save() {
    emit("done", { id, time, type, status: "stop", progress: 0 });
  }
</script>

<Cell span={12}>
  <form action="#">
    <LayoutGrid style="padding:10px;">
      <Cell span={12}>
        <Textfield bind:value={id} label="Id" />
      </Cell>
      <Cell span={12}>
        <Select bind:value={type} label="Type">
          {#each $Types as item}
            <Option value={item}>{item}</Option>
          {/each}
        </Select>
      </Cell>
      <Cell span={12}>
        <Textfield bind:value={size} label="Size" suffix="g" type="number" />
      </Cell>
      <Cell span={12}>
        <Textfield bind:value={time} label="Size" suffix="sec" type="number" />
      </Cell>
      <Cell span={12}>
        <Button on:click={Save}>
          <Label>Save</Label>
        </Button>
      </Cell>
    </LayoutGrid>
  </form>
</Cell>
