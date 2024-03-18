<script>
  import Button, { Label } from "@smui/button";
  import CircularProgress from "@smui/circular-progress";
  import Fab from "@smui/fab";
  import Dialog, { Content } from "@smui/dialog";

  import Title from "./Components/Main Components/Title.svelte";
  import Store from "./Components/Db Components/store.svelte";
  import Card from "./Components/Main Components/CardForm.svelte";
  import Form from "./Components/Form Components/form.svelte";
  import InputTime from "./Components/Form Components/inputTime.svelte";
  import Timer from "./Components/Timer Components/timer.svelte";

  let open = false;
</script>

<main>
  <Store useLocalStorage let:edit let:add let:del>
    <Title value="Temporizadores" />
    <div slot="print" let:id let:data>
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
            <span
              >{parseFloat((current_time / 1000 / 60).toString()).toFixed(1)}
            </span>:
            <span
              >{parseFloat(((current_time / 1000) % 60).toString()).toFixed(1)}
            </span><br />
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
          <Button on:click={() => del(id)}>
            <Label>Del</Label>
          </Button>
        </div>
      </Card>
    </div>
    <div slot="input">
      <Dialog
        bind:open
        aria-labelledby="simple-title"
        aria-describedby="simple-content"
      >
        <Content id="simple-content">
          <Form
            on:submit={({ detail: time }) => {
              let [hours, minutes, seconds] = time;
              let data = {
                status: "Stop",
                seconds: hours * 60 * 60 + minutes * 60 + seconds,
                time: { start: 0, end: 0, pause: 0 },
              };
              add(data);
              open = !open;
            }}
          >
            <InputTime value="0" label="hours" suffix="hrs" />
            <InputTime value="0" label="minutes" suffix="min" />
            <InputTime value="0" label="seconds" suffix="sec" />
          </Form>
        </Content>
      </Dialog>
    </div>
    <div class="fab-icon-add">
      <Fab on:click={() => (open = !open)}>
        <span style="font-size:30px;">+</span>
      </Fab>
    </div>
  </Store>
</main>

<style>
  div.fab-icon-add {
    display: block;
    position: fixed;
    bottom: 10px;
    right: 10px;
    z-index: 10000;
  }
</style>
