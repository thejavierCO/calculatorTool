<script>
  import DataTypes from "../js/data";
  import Card, { Content, Actions } from "@smui/card";
  import Autocomplete from "@smui-extra/autocomplete";
</script>

<Card>
  <Content>
    <Autocomplete
      options={DataTypes}
      label="Type"
      textfield$variant="outlined"
    />
  </Content>
</Card>
