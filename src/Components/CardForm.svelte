<script>
  import { onMount } from "svelte";
  import { Cards } from "../js/data";
  import { createEventDispatcher } from "svelte";
  import Timer from "./timer.svelte";
  import Card, { Content, Actions } from "@smui/card";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import Button, { Label } from "@smui/button";
  import { v4 as uuidv4 } from "uuid";
  export let id = 0;
  export let type = undefined;
  let progresso = 0;
  const emit = createEventDispatcher();
  onMount(() => {
    let unsus = Cards.subscribe((e) => {
      console.log(
        id,
        e.map((e) => {
          if (e.id == id) {
            if (typeof e.progress === "number") {
              progresso = e.progress;
            }
          }
          return e;
        })
      );
    });
  });
</script>

<Cell>
  <Card>
    <Content>
      <LayoutGrid>
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
            <Label style="text-align:center">view id</Label>
          </Button>
        {/if}
      </Actions>
    </Content>
  </Card>
</Cell>
