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
              :placeholder="inputError ? 'please enter a todo' : 'add new todo'"
              v-model="input.todo" />
          </div>
        </li>
      </ul>
      <button class="button" :style="{ 'margin-top': 1 + 'em' }">
        <span class="text">Add todo</span>
      </button>
    </form>

    <div :style="{ 'margin-top': marginTop + 'em' }">
      <div v-if="todos.length > 0">
        <ul class="list">
          <li class="list-item" v-for="item in todos" :key="item.$id">
            <list-todo :item="item" />
          </li>
        </ul>
      </div>
      <div v-else>
        <p class="text u-bold">No item in the database</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Client, Databases, ID } from "appwrite";

const runtimeConfig = useRuntimeConfig();

const client = new Client();
const databases = new Databases(client);

client
  .setEndpoint(runtimeConfig.public.API_ENDPOINT)
  .setProject(runtimeConfig.public.PROJECT_ID);

const getTodo = databases.listDocuments(
  runtimeConfig.public.DATABASE_ID,
  runtimeConfig.public.COLLECTION_ID
);

const create = (data) =>
  databases.createDocument(
    runtimeConfig.public.DATABASE_ID,
    runtimeConfig.public.COLLECTION_ID,
    ID.unique(),
    data
  );

const name = ref("Add tooodooos");

const marginTop = ref("3");

const todos = ref([]);

const input = reactive({
  todo: "",
});

const inputError = ref(false);

const handleInputChange = () => {
  if (!input.todo) {
    return (inputError.value = true);
  }
  create({
    todo: input.todo,
  }).then(
    function (response) {
      window.location.reload();
    },
    function (error) {
      console.log(error);
    }
  );
};

onMounted(() => {
  getTodo.then(
    function (response) {
      todos.value = response.documents;
    },
    function (error) {
      console.log(error);
    }
  );
});
</script>
