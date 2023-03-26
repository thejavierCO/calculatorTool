<script>
  import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
  import Content from "./Components/Content.svelte";
  import Form from "./Components/Form.svelte";
</script>

<main>
  <TopAppBar variant="static">
    <Row>
      <Section>
        <Title>Calculators</Title>
      </Section>
    </Row>
  </TopAppBar>
  <Content>
    <Form>init</Form>
  </Content>
</main>
