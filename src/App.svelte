<script>
  import Title from "./Components/Title.svelte";
  import Card from "./Components/CardForm.svelte";
  import Form from "./Components/form.svelte";
  import LayoutGrid, { Cell } from "@smui/layout-grid";

  import { store, Types } from "./js/data";
  import Timer from "./Components/timer.svelte";
  import Test from "./Components/simpleTimer.svelte";
  import Button, { Label } from "@smui/button";
  let { base } = store;

  let addItem = ({ detail }) => {
    store.add(detail);
  };
  let delItem = ({ detail }) => {
    store.del(detail.id);
  };
  let editItem = ({ detail }) => {
    store.edit(detail.id, (data) => {
      console.log(data, "edit");
      return data;
    });
  };
  let updatePosicion = (id, data) => {
    store.edit(id, (item) => {
      let { posicion, time } = data;
      item.progress = (posicion * 1) / time;
      return item;
    });
  };

  let updateStatus = (id, data) => {
    store.edit(id, (item) => {
      let { status } = data;
      item.status = status;
      return item;
    });
  };
  const temp = ({ detail }) => {
    console.log(detail);
  };
</script>

<main>
  <Title value="Working" />
  <LayoutGrid>
    <!-- <Test seconds={5} on:Status={temp}>
      <span>
        {status}
      </span>
    </Test> -->
    {#if $base.length == 0}
      <Card type="start" on:add={addItem}>
        <!-- <Form {Types} on:done={addItem} /> -->
      </Card>
    {:else}
      {#each $base as item}
        <Card
          type="item"
          id={item.id}
          on:add={addItem}
          on:del={delItem}
          on:edit={editItem}
        >
          <Cell span={12}>
            <Test
              seconds={item.time}
              posicion={Math.round((item.progress * (item.time * 1000)) / 1)}
              status={item.status}
              on:Play={(evt) => updatePosicion(item.id, evt.detail)}
              on:Status={(evt) => updateStatus(item.id, evt.detail)}
              let:posicion
              let:status
              let:start
            >
              <p>{posicion}</p>
              <Button on:click={start}>
                <Label>{status == "play" ? "pause" : "play"}</Label>
              </Button>
            </Test>
          </Cell>
          <!-- <Timer
            id={item.id}
            type="temporizer"
            {store}
            bind:status={item.status}
            bind:progress={item.progress}
            bind:time={item.time}
          /> -->
        </Card>
      {/each}
    {/if}
  </LayoutGrid>
</main>
