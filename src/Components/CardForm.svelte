<script>
  import { createEventDispatcher } from "svelte";
  import Card, { Content, Actions } from "@smui/card";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import Button, { Label } from "@smui/button";
  import { v4 as uuidv4 } from "uuid";
  export let id = 0;
  export let type = undefined;
  const emit = createEventDispatcher();
</script>

<Cell>
  <Card>
    <Content>
      <LayoutGrid>
        <Cell span={12}>
          <span>{id}</span>
        </Cell>
      </LayoutGrid>
      <Actions>
        <Button on:click={() => emit("add", { id: uuidv4() })}>
          <Label style="text-align:center">add</Label>
        </Button>
        {#if type == "item"}
          <Button on:click={() => emit("del", { id })}>
            <Label style="text-align:center">Del</Label>
          </Button>
          <Button on:click={() => emit("edit", { id })}>
            <Label style="text-align:center">view id</Label>
          </Button>
        {/if}
      </Actions>
    </Content>
  </Card>
</Cell>
