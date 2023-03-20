<script>
  import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
  import Card, { Content, Actions, ActionIcons } from "@smui/card";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import Button, { Label } from "@smui/button";
  import IconButton, { Icon } from "@smui/icon-button";
</script>

<main>
  <TopAppBar variant="static" color="secondary">
    <Row>
      <Section>
        <Title>Calculators</Title>
      </Section>
    </Row>
  </TopAppBar>
  <LayoutGrid>
    <Cell span={4}>
      <Card>
        <Content />
      </Card>
    </Cell>
  </LayoutGrid>
</main>

<style>
</style>
