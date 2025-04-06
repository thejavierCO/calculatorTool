<script>
  import { blur } from "svelte/transition";
  import Button, { Label } from "@smui/button";
  import CircularProgress from "@smui/circular-progress";
  import Fab from "@smui/fab";
  import Dialog, { Content } from "@smui/dialog";
  import Title from "./Components/Main Components/Title.svelte";
  import Store from "./Components/Db Components/store.svelte";
  import Card from "./Components/Main Components/CardForm.svelte";
  import Form from "./Components/Form Components/form.svelte";
  import InputTime from "./Components/Form Components/inputTime.svelte";
  import Timer from "./Components/Timer Components/timer_inde.svelte";
  import Main from "./Components/Main Components/Main.svelte";
  import FormatCounter from "./Components/Timer Components/FormatCounter.svelte";
  let open = false;
</script>

<Main>
  <Store useLocalStorage let:edit let:add let:del>
    <Title value={`Temporizadores`} />
    <Dialog
      bind:open
      aria-labelledby="simple-title"
      aria-describedby="simple-content"
    >
      <Content id="simple-content">
        <Form on:submit={({ detail: [h, m, s] }) => {
          const Sec = (!h?0:h) * 60 * 60 + (!m?0:m) * 60 + (!s?0:s);
          if(Sec==0) throw alert("not defined time");
          add({
            status: "Stop",
            seconds: Sec,
            time: { start: 0, end: 0, pause: 0 },
          });
          open = !open;
        }}>
          <InputTime value="0" label="hours" suffix="hrs" />
          <InputTime value="0" label="minutes" suffix="min" />
          <InputTime value="0" label="seconds" suffix="sec" />
        </Form>
      </Content>
    </Dialog>
    <div
      slot="print"
      let:id
      let:data
      in:blur={{ duration: 500 }}
      out:blur={{ duration: 500 }}
    >
      <Card {id}>
        <Timer
          seconds={data.seconds}
          status={data.status}
          time={data.time}
          on:Status={({ detail: data }) => edit(id, data)}
          let:btnPlay
          let:btnStop
          let:btnPause
          let:status
          let:position
        >
          <FormatCounter time={position} let:Data>
            <h3>
              <p>
                {#if Data.Hours != 0}{Data.pad.Hours} :{/if}
                {#if Data.Minutes != 0}{Data.pad.Minutes} :{/if}
                {#if Data.Seconds != 0}{Data.pad.Seconds} : {/if}
                {#if Data.Miliseconds != 0}{Data.pad.Miliseconds}{/if}
                
              </p>
            </h3>
            <CircularProgress
              style="height: 200px; width: 200px;"
              progress={Data.useRange(data.seconds)}
            /><br />
          </FormatCounter>
          {#if status != "Play"}
            <Button on:click={btnPlay}>
              <Label>Play</Label>
            </Button>
          {:else}
            <Button on:click={btnStop}>
              <Label>Stop</Label>
            </Button>
            <Button on:click={btnPause}>
              <Label>Pause</Label>
            </Button>
          {/if}
          <Button on:click={() => del(id)}>
            <Label>Del</Label>
          </Button>
        </Timer>
      </Card>
    </div>
    <div class="fab-icon-add">
      <Fab on:click={() => (open = !open)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-clock-plus"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#000000"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M20.984 12.535a9 9 0 1 0 -8.468 8.45" />
          <path d="M16 19h6" />
          <path d="M19 16v6" />
          <path d="M12 7v5l3 3" />
        </svg>
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
