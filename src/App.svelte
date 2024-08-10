<script>
  import {blur} from "svelte/transition"
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
  import Main from "./Components/Main Components/Main.svelte";
  let open = false;
</script>

<Main>
  <Store 
  useLocalStorage
  let:edit
  let:add
  let:del
  >
    <Title value="Temporizadores" />
    <div slot="print" let:id let:data in:blur={{duration:500}} out:blur={{duration:500}}>
      <Card {id}>
        <Timer
          seconds={data.seconds}
          status={data.status}
          time={data.time}
          on:Status={({detail})=>edit(id,detail)}
          let:btnPlay
          let:btnStop
          let:btnPause
          let:status
          let:formatTime
        >
          <h3>
            <span>{formatTime.Hours}</span>:
            <span>{formatTime.Minutes}</span>:
            <span>{formatTime.Seconds}</span>
          </h3>
          <CircularProgress
            style="height: 200px; width: 200px; stroke:red !important;"
            progress={formatTime.useRange(data.seconds)}
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
    <div slot="input" in:blur={{duration:500}} out:blur={{duration:500}}>
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
</Main>

<style>
  div.fab-icon-add {
    display: block;
    position: fixed;
    bottom: 10px;
    right: 10px;
    z-index: 10000;
  }
</style>
