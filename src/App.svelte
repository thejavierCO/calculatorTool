<script>
  import Title from "./Components/Title.svelte";
  import Store from "./Components/store.svelte";

  import Card from "./Components/CardForm.svelte";
  import Form from "./Components/form.svelte";
  import Button, { Label } from "@smui/button";

  import Timer from "./Components/timer.svelte";
  import CircularProgress from "@smui/circular-progress";

</script>

<main>
  <Store useLocalStorage>
    <Title value="Temporizadores" />
    <div slot="input" let:action>
      <Card>
        <h1>new form temporal</h1>
        <Form btnSubmitText="Save" on:save={({ detail }) => action(detail)} />
      </Card>
    </div>
    <div slot="print" let:edit let:del let:id let:data>
      <Card {id}>
        <Timer
          on:state={({ detail }) => edit(detail)}
          on:time={({ detail }) => edit(detail)}
          seconds={data.seconds}
          status={data.status}
          time={data.time}
          let:btnPlay
          let:btnStop
          let:btnPause
          let:status
          let:posicion
        >
          <!-- <CircularProgress
            style="height: 200px; width: 200px; stroke:red !important;"
            progress={Number(posicion(1, 3))}
          /><br /> -->
          <p>{data.seconds}</p>
          <p>{data.status}</p>
          <p>{JSON.stringify(data.time)}</p>
          <p>{status}</p>
          <p>{Number(posicion(1,2)) % 60}</p>
          
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
