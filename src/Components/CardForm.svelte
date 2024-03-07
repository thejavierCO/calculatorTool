<script>
  import Card, { Content, Actions } from "@smui/card";
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
