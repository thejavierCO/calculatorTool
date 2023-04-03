<script>
  import { Cards } from "../js/data";
  import { createEventDispatcher } from "svelte";
  import Card, { Content, Actions } from "@smui/card";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import Button, { Label } from "@smui/button";
  import Timer from "./timer.svelte";
  import { v4 as uuidv4 } from "uuid";
  export let id = 0;
  export let type = undefined;
  const emit = createEventDispatcher();
  let progresso = 0;
  Cards.subscribe((e) =>
    e.forEach((e) => {
      if (e.id == id) {
        if (typeof e.progress === "number") {
          progresso = e.progress;
        } else progresso = 0;
      }
    })
  );
</script>

<Cell>
  <Card>
    <Content>
      <LayoutGrid>
        <Cell span={12}>{id}</Cell>
        {#if type !== "start"}
          <Timer
            on:progress={({ detail }) => {
              Cards.update((e) =>
                e.map((e) => {
                  let { id: cardid } = e;
                  if (cardid === id) {
                    e.progress = detail;
                  }
                  return e;
                })
              );
            }}
            bind:progress={progresso}
            type="temporizer"
          />
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
