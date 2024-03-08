<script>
  import Card, { Content, Actions } from "@smui/card";
  export let id = false;
</script>

<Card>
  {#if id}
  <Content style="text-align: center;" {id}>
    <slot>Default</slot>
    {#if $$slots.actions}
      <Actions fullBleed>
        <slot name="actions" />
      </Actions>
    {/if}
  </Content>
  {:else}
  <Content style="text-align: center;" {id}>
    <slot>Default</slot>
    {#if $$slots.actions}
      <Actions fullBleed>
        <slot name="actions" />
      </Actions>
    {/if}
  </Content>
  {/if}
</Card>
