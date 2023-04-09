<script>
  import Title from "./Components/Title.svelte";
  import Card from "./Components/CardForm.svelte";
  import Form from "./Components/form.svelte";
  import CircularProgress from "@smui/circular-progress";
  import LayoutGrid, { Cell } from "@smui/layout-grid";

  import { store, Types } from "./js/data";
  import Timer from "./Components/simpleTimer.svelte";
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
</script>

<main>
  <Title value="Working" />
  <LayoutGrid>
    {#if $base.length == 0}
      <Card type="start">
        <Form {Types} on:done={addItem} />
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
          <Cell span={12} style="text-align: center;">
            <Timer
              bind:seconds={item.time}
              posicion={Math.round((item.progress * (item.time * 1000)) / 1)}
              bind:status={item.status}
              on:Play={(evt) => updatePosicion(item.id, evt.detail)}
              on:Status={(evt) => updateStatus(item.id, evt.detail)}
              let:posicion
              let:status
              let:start
              let:clear
            >
              <p>
                <CircularProgress
                  style="height: 200px; width: 200px;"
                  progress={(posicion * 1) / (item.time * 1000)}
                  closed={false}
                />
              </p>
              <p>
                {#if status == "play"}
                  <Button on:click={start}>
                    <Label>Pause</Label>
                  </Button>
                  <Button on:click={clear}>
                    <Label>clear</Label>
                  </Button>
                {:else}
                  <Button on:click={start}>
                    <Label>play</Label>
                  </Button>
                {/if}
              </p>
            </Timer>
          </Cell>
        </Card>
      {/each}
    {/if}
  </LayoutGrid>
</main>
