<script>
  import DataTypes from "../js/data";
  import { createEventDispatcher } from "svelte";
  import Card, { Content, Actions } from "@smui/card";
  import Autocomplete from "@smui-extra/autocomplete";
  import Textfield from "@smui/textfield";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import Button, { Label } from "@smui/button";
  const emit = createEventDispatcher();
  let init = 10;
  let type = "";
</script>

<Card>
  <Content>
    <!-- <LayoutGrid>
      <Cell span={12}> -->
    <Textfield label="Size" bind:value={init} type="number" />
    <!-- </Cell>
      <Cell span={12}> -->
    <br /><br />
    <Autocomplete
      options={DataTypes}
      bind:value={type}
      label="Type"
      textfield$variant="outlined"
    />
    <!-- </Cell>
    </LayoutGrid> -->
    <Actions fullBleed>
      <Button on:click={(_) => emit("save", { size: init, type })}>
        <Label style="text-align:center">Save</Label>
      </Button>
    </Actions>
  </Content>
</Card>
