<script>
  import { createEventDispatcher, onMount } from "svelte";
  import Card, { Content, Actions } from "@smui/card";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import Button, { Label } from "@smui/button";
  const emit = createEventDispatcher();
</script>

<Card>
  <Content style="text-align: center;">
    <slot>Default</slot>
    {#if $$slots.actions}
      <Actions fullBleed>
        <slot name="actions" />
      </Actions>
    {/if}
  </Content>
</Card>
