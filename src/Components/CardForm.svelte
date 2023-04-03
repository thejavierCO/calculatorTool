<script>
  import { onDestroy, onMount, createEventDispatcher } from "svelte";
  import Card, { Content, Actions } from "@smui/card";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import Button, { Label } from "@smui/button";
  const emit = createEventDispatcher();
  export let data = Math.round(Math.random() * 100);
  export let store;
  onDestroy(() => {
    console.log("del", data);
  });
</script>

<Cell>
  <Card>
    <Content>
      <LayoutGrid>
        <Cell span={12}>
          <span>{data}</span>
        </Cell>
      </LayoutGrid>
      <Actions>
        <Button on:click={() => emit("add", data)}>
          <Label style="text-align:center">add</Label>
        </Button>
        <Button on:click={() => emit("del", data)}>
          <Label style="text-align:center">Del</Label>
        </Button>
        <Button on:click={() => emit("edit", data)}>
          <Label style="text-align:center">Edit</Label>
        </Button>
      </Actions>
    </Content>
  </Card>
</Cell>
