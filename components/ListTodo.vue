<template>
  <span class="text">{{ item.todo }}</span>
  <div>
    <span
      class="icon-pencil"
      aria-hidden="true"
      :style="{ 'margin-right': space + 'em' }"></span>
    <span
      class="icon-trash"
      aria-hidden="true"
      @click.prevent="handleDeleteTodo"></span>
  </div>
</template>

<script lang="ts">
import { deleteTodo } from "~/utils";

export default {
  props: ["item"],
  data() {
    return {
      space: 1,
    };
  },
  methods: {
    handleDeleteTodo() {
      deleteTodo(
        this.item.$databaseId,
        this.item.$collectionId,
        this.item.$id
      ).then(
        function (response) {
          window.location.reload();
        },
        function (error) {
          console.log(error);
        }
      );
    },
  },
};
</script>
