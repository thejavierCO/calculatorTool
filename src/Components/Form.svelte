<script>
  import DataTypes from "../js/data";
  import Card, { Content, Actions } from "@smui/card";
  import Autocomplete from "@smui-extra/autocomplete";
  import Textfield from "@smui/textfield";
  let init = 10;
</script>

<Card>
  <Content>
    <Textfield label="Peso" bind:value={init} type="number" min="0" />
    <hr />
    <Autocomplete
      options={DataTypes}
      label="Type"
      textfield$variant="outlined"
    />
  </Content>
</Card>
