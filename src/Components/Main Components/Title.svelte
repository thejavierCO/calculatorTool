<script>
  import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
  export let value;
</script>

<TopAppBar variant="static">
  <Row>
    <Section>
      <Title>{value}</Title>
    </Section>
  </Row>
</TopAppBar>
