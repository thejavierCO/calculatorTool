<script>
  import Title from "./Components/Title.svelte";
  import Store from "./Components/store.svelte";

  import Card from "./Components/CardForm.svelte";
  import Form from "./Components/form.svelte";
  import Button, { Label } from "@smui/button";

  import Timer from "./Components/timer.svelte";
  import CircularProgress from "@smui/circular-progress";

  import { storeBase, ConutTime } from "./js/data";
  const store = storeBase([]).useLocalStorage("s");
  const posicion = new ConutTime(100).getTime();
</script>

<main>
  <Store {store}>
    <Title value="Temporizadores" />
    <div slot="print" let:edit let:del let:id let:data>
      <Card>
        <Timer
          on:state={({ detail }) => edit(detail)}
          on:time={({ detail }) => edit(detail)}
          seconds={data.seconds}
          status={data.status}
          time={data.time}
          {posicion}
          let:btnPlay
          let:btnStop
          let:btnPause
          let:status
          let:posicion
        >
          ID:{id}<br />
          <CircularProgress
            style="height: 200px; width: 200px; stroke:red !important;"
            progress={Number(posicion(1, 3))}
          /><br />
          {posicion(1000, 3)}<br />
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
    <div slot="input" let:action>
      <Card>
        <Form btnSubmitText="Save" on:save={({ detail }) => action(detail)} />
      </Card>
    </div>
  </Store>
</main>
