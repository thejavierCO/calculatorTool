<script>
  import Title from "./Components/Title.svelte";
  import Card from "./Components/CardForm.svelte";
  import Form from "./Components/form.svelte";
  import Store from "./Components/store.svelte";
  import Button, { Label } from "@smui/button";
  import Timer from "./Components/timer.svelte";
  import { storeBase, Types } from "./js/data";
  export let id = "store";
  export let ver = "0.0.1";
  const store = storeBase(id, [], true);
  function errorEvent(a) {
    console.log(a);
  }
</script>

<main>
  <Store {store} let:add let:Id on:error={errorEvent}>
    <Title value={"Working " + ver} />
    <div slot="loop" let:id let:data let:del let:edit>
      <Card>
        <Timer {data} />
        <Form {id} time={data.time} action={edit} textBtnSubmit="Edit">
          <div slot="moreBtn">
            <Button on:click={del}>
              <Label>Del</Label>
            </Button>
          </div>
        </Form>
      </Card>
    </div>
    <div slot="add">
      <Card>
        <Form id="" action={add} textBtnSubmit="Save" />
      </Card>
    </div>
  </Store>
</main>
