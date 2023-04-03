<script>
  import { onDestroy, onMount, createEventDispatcher } from "svelte";
  import Card, { Content, Actions } from "@smui/card";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import Button, { Label } from "@smui/button";
  import { v4 as uuidv4 } from "uuid";
  export let id = uuidv4();
  const emit = createEventDispatcher();
  onDestroy(() => console.log("del id:" + id));
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
        <Button on:click={() => emit("add", id)}>
          <Label style="text-align:center">add</Label>
        </Button>
        <Button on:click={() => emit("del", id)}>
          <Label style="text-align:center">Del</Label>
        </Button>
        <Button on:click={() => emit("edit", id)}>
          <Label style="text-align:center">Edit</Label>
        </Button>
      </Actions>
    </Content>
  </Card>
</Cell>
