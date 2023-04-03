<script>
  import { createEventDispatcher, onMount } from "svelte";
  import Card, { Content, Actions } from "@smui/card";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import Button, { Label } from "@smui/button";
  import Timer from "./timer.svelte";
  import { v4 as uuidv4 } from "uuid";
  export let id = 0;
  export let type = undefined;
  export let progress = 0;
  export let start = false;
  const emit = createEventDispatcher();
  onMount(() => {
    console.log("mounted");
  });
</script>

<Cell>
  <Card>
    <Content>
      <LayoutGrid>
        <Cell span={12}>{id}</Cell>
        {#if type !== "start"}
          <Timer bind:start bind:progress type="temporizer" />
        {:else}
          Add Item
        {/if}
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
            <Label style="text-align:center">Edit</Label>
          </Button>
        {/if}
      </Actions>
    </Content>
  </Card>
</Cell>
