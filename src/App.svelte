<script>
  import Button from "@smui/button";
  import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
  import Card, { Content, Actions } from "@smui/card";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
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
        <Content>
          <h3>6</h3>
        </Content>
      </Card>
    </Cell>

    <Cell span={4}>
      <Card>
        <Content>
          <h3>6</h3>
        </Content>
      </Card>
    </Cell>

    <Cell span={4}>
      <Card>
        <Content>
          <h3>6</h3>
        </Content>
      </Card>
    </Cell>

    <Cell span={4}>
      <Card>
        <Content>
          <h3>6</h3>
        </Content>
      </Card>
    </Cell>
  </LayoutGrid>
</main>

<style>
</style>
