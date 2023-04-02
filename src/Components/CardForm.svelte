<script>
  import Card, { Content, Actions } from "@smui/card";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import Button, { Label } from "@smui/button";
</script>

<Card>
  <Content>
    <LayoutGrid>
      <Cell span={12}>
        <Button>
          <Label style="text-align:center">Save</Label>
        </Button>
      </Cell>
    </LayoutGrid>
    <Actions fullBleed>
      <Button>
        <Label style="text-align:center">Save</Label>
      </Button>
    </Actions>
  </Content>
</Card>
