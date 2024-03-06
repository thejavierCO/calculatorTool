<script>
  import pkg from "../../package.json"
  import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
  export let value;
  export let version = pkg.version;
</script>

<TopAppBar variant="static">
  <Row>
    <Section>
      <Title>{value} - {version}</Title>
    </Section>
  </Row>
</TopAppBar>
