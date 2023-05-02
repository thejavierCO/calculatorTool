<script>
  import Title from "./Components/Title.svelte";
  import Card from "./Components/CardForm.svelte";
  import Form from "./Components/form.svelte";
  import Store from "./Components/store.svelte";
  import Button, { Label } from "@smui/button";
  import Timer from "./Components/timer.svelte";
  import { storeBase } from "./js/data";
  export let id = "store";
  export let ver = "0.0.1";
  const store = storeBase(id, []);
</script>

<main>
  <Store {store}>
    <Title value={"Working Testing " + ver} />
    <div slot="input" let:action>
      <Card>
        <Form btnSubmitText="Save" on:save={({ detail }) => action(detail)} />
      </Card>
    </div>
    <div slot="print" let:edit let:del let:id let:data>
      <Card>
        <Timer
          on:state={({ detail }) => console.log(data.id, detail)}
          seconds={data.seconds}
          status={data.status}
          time={data.time}
          let:btnPlay
          let:btnStop
          let:btnPause
          let:status
          let:posicion
          autoRun
        >
          {posicion}
          {#if status == "Play"}
            <Button on:click={btnStop}>
              <Label>Stop</Label>
            </Button>
            <Button on:click={btnPause}>
              <Label>Pause</Label>
            </Button>
          {:else}
            <Button on:click={btnPlay}>
              <Label>Play</Label>
            </Button>
          {/if}
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
