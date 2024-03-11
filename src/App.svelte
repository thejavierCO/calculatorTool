<script>
  import Title from "./Components/Title.svelte";
  import Store from "./Components/store.svelte";

  import Card from "./Components/CardForm.svelte";
  import Form from "./Components/Form Components/form.svelte";
  import InputTime from "./Components/Form Components/inputTime.svelte";
  import Button, { Label } from "@smui/button";

  import Timer from "./Components/timer.svelte";
  import CircularProgress from "@smui/circular-progress";
</script>

<main>
  <Store useLocalStorage>
    <Title value="Temporizadores" />
    <div slot="print" let:edit let:del let:id let:data let:index>
      <Card {id}>
        <Timer
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
          <h4>
            <span>{Math.round(current_time / 1000 / 60 / 60)} :</span>
            <span>{Math.round(current_time / 1000 / 60)} :</span>
            <span>{Math.round(current_time / 1000)} </span>
          </h4>
          <CircularProgress
            style="height: 200px; width: 200px; stroke:red !important;"
            progress={Number(
              parseFloat(
                ((current_time * 1) / (data.seconds * 1000)).toString()
              ).toFixed(3)
            )}
          /><br />
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
        <Form
          on:submit={({ detail: time }) => {
            let [hours, minutes, seconds] = time;
            let data = {
              status: "Stop",
              seconds: hours * 60 * 60 + minutes * 60 + seconds,
              time: { start: 0, end: 0, pause: 0 },
            };
            action(data);
          }}
        >
          <InputTime value="0" label="hours" suffix="hrs" />
          <InputTime value="0" label="minutes" suffix="min" />
          <InputTime value="0" label="seconds" suffix="sec" />
        </Form>
      </Card>
    </div>
  </Store>
</main>
