<script>
  import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
  import Card, { Content, Actions, ActionIcons } from "@smui/card";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import Button, { Label } from "@smui/button";
  import IconButton, { Icon } from "@smui/icon-button";
  import Autocomplete from "@smui-extra/autocomplete";
  import Textfield from "@smui/textfield";
  import HelperText from "@smui/textfield/helper-text";
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
        <form action="#">
          <Content>
            <Autocomplete
              options={[
                "black container",
                "white container",
                "metalic container",
              ]}
              textfield$variant="outlined"
              label="Type"
            />
            <hr />
            <Textfield label="adasd" value="test">
              <HelperText slot="helper">Helper Text</HelperText>
            </Textfield>
          </Content>
        </form>
      </Card>
    </Cell>
  </LayoutGrid>
</main>
