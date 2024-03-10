<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";

  import Select, { Option } from "@smui/select";
  import Textfield from "@smui/textfield";
  import Switch from "@smui/switch";
  import FormField from "@smui/form-field";
  import Checkbox from "@smui/checkbox";
  import Chip, { Set, Text } from "@smui/chips";
  import Button, { Label } from "@smui/button";
  import Radio from "@smui/radio";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import HelperText from "@smui/textfield/helper-text";
  const emit = createEventDispatcher();
  onMount(() => {
    Array.from(
      document
        .querySelector("#my_form")
        .querySelectorAll("input[type='number']")
    ).map((e: HTMLInputElement) => {
      e.min = "0";
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
            return e.value ? e.value : e;
          })
        )}
    >
      <LayoutGrid>
        <slot />
        <Cell span={12}>
          <Button><Label>submit</Label></Button>
        </Cell>
      </LayoutGrid>
    </form>
  </Cell>
</LayoutGrid>
