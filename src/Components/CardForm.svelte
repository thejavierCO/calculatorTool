<script>
  import { createEventDispatcher, onMount } from "svelte";
  import Card, { Content, Actions } from "@smui/card";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import Button, { Label } from "@smui/button";
  import { v4 as uuidv4 } from "uuid";
  export let id = "";
  export let type = undefined;
  const emit = createEventDispatcher();
</script>

<Cell>
  <Card>
    <Content style="text-align: center;">
      <LayoutGrid style="padding:5px;">
        <slot>Default</slot>
      </LayoutGrid>
      <Actions fullBleed>
        <!-- <Button
          on:click={() =>
            emit("add", {
              id: uuidv4(),
              status: "stop",
              progress: 0,
              time: 30,
            })}
        >
          <Label>add</Label>
        </Button> -->
        {#if type == "item"}
          <Button on:click={() => emit("del", { id })}>
            <Label style="text-align:center;">Del</Label>
          </Button>
          <!-- <Button on:click={() => emit("edit", { id })}>
            <Label>Edit</Label>
          </Button> -->
        {/if}
      </Actions>
    </Content>
  </Card>
</Cell>
