<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import Button, { Label } from "@smui/button";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  const emit = createEventDispatcher();
  onMount(() => {
    Array.from(
      document
        .querySelector("#my_form")
        .querySelectorAll("input[type='number']")
    ).map((e: HTMLInputElement) => {
      e.min = "0";
      e.max = "59";
      return e;
    });
  });
</script>

<LayoutGrid id="my_form" style="padding:0px;">
  <Cell span={12}>
    <form
      on:submit|preventDefault={(evt) =>
        emit(
          "submit",
          Array.from(evt.currentTarget.querySelectorAll("input")).map((e) => {
            if (e.type == "number") return Number(e.value ? e.value : e);
          })
        )}
    >
      <LayoutGrid style="padding:16px;">
        <slot />
        <Cell span={12}>
          <Button><Label>submit</Label></Button>
        </Cell>
      </LayoutGrid>
    </form>
  </Cell>
</LayoutGrid>
