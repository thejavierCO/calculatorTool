<script>
  import Button from "@smui/button";
  import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
  import Card, { Content, Actions } from "@smui/card";
</script>

<main>
  <TopAppBar variant="static" color="secondary">
    <Row>
      <Section>
        <Title>Calculators</Title>
      </Section>
    </Row>
  </TopAppBar>
  <Content>
    <Card>
      <Content>
        <h3>Hello</h3>
      </Content>
      <Actions fullBleed>
        <Button>Work</Button>
      </Actions>
    </Card>
  </Content>
</main>

<style>
</style>
