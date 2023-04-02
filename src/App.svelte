<script>
  import Title from "./Components/Title.svelte";
  import Content from "./Components/Content.svelte";
  import Form from "./Components/Form.svelte";
  function add(...a) {
    console.log(a);
  }
</script>

<main>
  <Title value="Working" />
  <Content>
    <Form on:save={add} />
  </Content>
</main>
