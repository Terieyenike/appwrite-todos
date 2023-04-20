<template>
  <div class="container">
    <Header />
    <h1 class="heading-level-1" :style="{ 'margin-top': 1 + 'rem' }">
      {{ name }}
    </h1>

    <form
      class="form u-width-full-line u-max-width-500 u-flex u-main-center"
      :style="{ 'margin-top': 1 + 'em' }"
      @submit.prevent="handleInputChange">
      <ul class="form-list">
        <li class="form-item">
          <label class="label">Todo</label>
          <div class="input-text-wrapper">
            <input
              class="input-text"
              type="text"
              placeholder="add todo"
              v-model="input.todo" />
          </div>
        </li>
      </ul>
      <button class="button" :style="{ 'margin-top': 1 + 'em' }">
        <span class="text">Add todo</span>
      </button>
    </form>

    <div :style="{ 'margin-top': marginTop + 'em' }">
      <ul class="list">
        <li
          class="list-item u-flex u-main-space-between u-cross-center"
          v-for="item in todos"
          :key="item.$id">
          <span class="text">{{ item.todo }}</span>
          <div>
            <span
              class="icon-pencil"
              aria-hidden="true"
              :style="{ 'margin-right': space + 'em' }"></span>
            <span class="icon-trash" aria-hidden="true"></span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { getTodo, create } from "~/utils";

const name = ref("Add tooodooos");

const marginTop = ref("3");
const space = ref(1);

const todos = ref(null);

const input = reactive({
  todo: "",
});

const handleInputChange = () => {
  if (!input.todo) {
    return;
  }
  create({
    todo: input.todo,
  }).then(
    function (response) {
      console.log("item successfully added to db");
      window.location.reload();
    },
    function (error) {
      console.log(error); // Failure
    }
  );
};

onMounted(() => {
  getTodo.then(
    function (response) {
      todos.value = response.documents;
      console.log(todos.value);
    },
    function (error) {
      console.log(error);
    }
  );
});
</script>
