<template>
  <form
    class="form u-width-full-line u-max-width-500 u-flex u-main-center"
    :style="{ 'margin-top': 1 + 'em' }">
    <ul class="form-list">
      <li class="form-item">
        <label class="label">Edit todo</label>
        <div class="input-text-wrapper">
          <input
            class="input-text"
            type="text"
            :placeholder="item.todo"
            :value="item.todo" />
        </div>
      </li>
    </ul>
    <button class="button" :style="{ 'margin-top': 1 + 'em' }">
      <span class="text">Update todo</span>
    </button>
  </form>
</template>

<script lang="ts">
// import { updateTodo } from "~/utils";

export default {
  props: ["item"],
  data() {
    return {
      showModal: false,
    };
  },
  methods: {},
};
</script>
