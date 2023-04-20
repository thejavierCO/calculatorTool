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
    console.warn(a);
  }
</script>

<main>
  <Store {store} on:error={errorEvent}>
    <Title value={"Working " + ver} />
    <div slot="input" let:action>
      <Card>
        <Form id="" {action} textBtnSubmit="Save" />
      </Card>
    </div>
    <div slot="print" let:edit let:del let:id let:data>
      <Card>
        <Timer
          time={data.time}
          status={data.status}
          start={data.start}
          let:btnPlay
          let:btnStop
          let:btnPause
          let:start
          let:status
          on:state={({ detail }) => edit(detail)}
        >
          <Form
            {id}
            {start}
            {status}
            time={data.time}
            action={edit}
            textBtnSubmit="Save"
          />
          <Button on:click={btnPlay}>
            <Label>Play</Label>
          </Button>
          <Button on:click={btnStop}>
            <Label>Stop</Label>
          </Button>
          <Button on:click={btnPause}>
            <Label>Pause</Label>
          </Button>
        </Timer>
        <div slot="actions">
          <Button on:click={del}>
            <Label>Del</Label>
          </Button>
        </div>
      </Card>
    </div>
  </Store>
</main>
