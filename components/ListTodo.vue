<template>
  <div class="u-flex u-main-space-between u-cross-center u-width-full-line">
    <span class="text">{{ item.todo }}</span>
    <div class="u-cursor-pointer">
      <span
        class="icon-pencil"
        aria-hidden="true"
        @click.prevent="showModal = !showModal"
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
            <input class="input-text" type="text" v-model="item.todo" />
          </div>
        </li>
      </ul>
      <button class="button" :style="{ 'margin-top': 1 + 'em' }">
        <span class="text">Update todo</span>
      </button>
    </form>
    <div class="u-cursor-pointer">
      <span
        class="icon-x u-font-size-32"
        @click.prevent="showModal = !showModal"
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

<script setup>
import { Client, Databases } from "appwrite";

const props = defineProps({
  item: Object,
});

const space = ref("1");
const showModal = ref(false);

const runtimeConfig = useRuntimeConfig();

const client = new Client();
const databases = new Databases(client);
client
  .setEndpoint(runtimeConfig.public.API_ENDPOINT)
  .setProject(runtimeConfig.public.PROJECT_ID);

const updateTodo = (database_id, collection_id, document_id, data) =>
  databases.updateDocument(database_id, collection_id, document_id, data);

const handleUpdateTodo = () => {
  updateTodo(props.item.$databaseId, props.item.$collectionId, props.item.$id, {
    todo: props.item.todo,
  }).then(
    function (response) {
      console.log(`${props.item.todo} successfully updated in DB`);
    },
    function (error) {
      console.log("Error updating the document", error.message);
    }
  );
};

const deleteTodo = (database_id, collection_id, document_id) =>
  databases.deleteDocument(database_id, collection_id, document_id);

const handleDeleteTodo = () => {
  deleteTodo(
    props.item.$databaseId,
    props.item.$collectionId,
    props.item.$id
  ).then(
    function (response) {
      window.location.reload();
    },
    function (error) {
      console.log(error);
    }
  );
};
</script>
