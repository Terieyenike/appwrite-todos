<template>
  <div class="u-flex u-main-space-between u-cross-center u-width-full-line">
    <span class="text">{{ item.todo }}</span>
    <div>
      <span
        class="icon-pencil"
        aria-hidden="true"
        @click.prevent="closeTodo"
        :style="{ 'margin-right': space + 'em' }"></span>
      <span
        class="icon-trash"
        aria-hidden="true"
        @click.prevent="handleDeleteTodo"></span>
    </div>
  </div>
  <div
    v-if="showModal"
    class="u-z-index-20 u-padding-24"
    :style="{
      position: 'fixed',
      top: '0',
      right: 0,
      left: 0,
      bottom: 0,
      'background-color': 'rgba(0, 0, 0, 0.8)',
      height: '100vh',
    }">
    <form
      class="form u-width-full-line u-max-width-500 u-flex u-main-center"
      @submit.prevent="handleUpdateTodo">
      <ul class="form-list">
        <li class="form-item">
          <label class="label" :style="{ color: 'white' }">Edit todo</label>
          <div class="input-text-wrapper">
            <input
              class="input-text"
              type="text"
              v-model="todo"
              :placeholder="item.todo" />
          </div>
        </li>
      </ul>
      <button class="button" :style="{ 'margin-top': 1 + 'em' }">
        <span class="text">Update todo</span>
      </button>
    </form>
    <div>
      <span
        class="icon-x u-font-size-32"
        @click.prevent="closeTodo"
        aria-hidden="true"
        :style="{
          position: 'absolute',
          top: '0',
          right: '1em',
          color: '#fff',
        }"></span>
    </div>
  </div>
</template>

<script lang="ts">
import { deleteTodo, updateTodo } from "~/utils";

export default {
  props: ["item"],
  data() {
    return {
      space: 1,
      showModal: false,
      todo: "",
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
    handleUpdateTodo() {
      updateTodo(
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
    closeTodo() {
      this.showModal = !this.showModal;
    },
  },
};
</script>
