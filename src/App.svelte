<script>
  import Title from "./Components/Title.svelte";
  import Store from "./Components/store.svelte";

  import Card from "./Components/CardForm.svelte";
  import Form from "./Components/Form Components/form.svelte";
  import InputTime from "./Components/Form Components/inputTime.svelte";
  import Button, { Label } from "@smui/button";

  import Timer from "./Components/timer.svelte";
  import CircularProgress from "@smui/circular-progress";
  import { children } from "svelte/internal";
</script>

<main>
  <Store
    on:edit={({ detail }) => console.log(detail, "edit")}
    on:add={({ detail }) => console.log(detail, "add")}
    on:del={({ detail }) => console.log(detail, "del")}
  >
    <Title value="Temporizadores" />
    <div slot="input" let:action>
      <Card>
        <Form on:submit={(evt) => console.log(evt)}>
          <InputTime value="0" label="hours" suffix="hrs" min="0" max="60" />
          <InputTime value="0" label="minutes" suffix="min" min="0" max="60" />
          <InputTime value="0" label="seconds" suffix="sec" min="0" max="60" />
        </Form>
      </Card>
    </div>
    <div slot="print" let:edit let:del let:id let:data let:index>
      <Card {id}>
        <!-- <Timer
          on:state={({ detail }) => edit(id, detail)}
          on:time={({ detail }) => edit(id, detail)}
          seconds={data.seconds}
          status={data.status}
          time={data.time}
          let:btnPlay
          let:btnStop
          let:btnPause
          let:status
          let:current_time
        >
          <h4>{index}</h4>
          <CircularProgress
            style="height: 200px; width: 200px; stroke:red !important;"
            progress={Number(
              parseFloat(
                ((current_time * 1) / (data.seconds * 1000)).toString()
              ).toFixed(3)
            )}
          /><br />
          <h3>{JSON.stringify(data)}</h3>
          <p>{status}</p>
          <p>{current_time}</p>
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
        </div> -->
      </Card>
    </div>
  </Store>
</main>
