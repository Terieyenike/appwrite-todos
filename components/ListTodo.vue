<template>
  <span class="text">{{ item.todo }}</span>
  <div class="u-cursor-pointer">
    <span
      class="icon-trash"
      aria-hidden="true"
      @click.prevent="handleDeleteTodo"></span>
  </div>
</template>

<script setup>
import { Client, Databases } from "appwrite";

const props = defineProps({
  item: String,
});

const runtimeConfig = useRuntimeConfig();

const client = new Client();
const databases = new Databases(client);

client
  .setEndpoint(runtimeConfig.public.API_ENDPOINT)
  .setProject(runtimeConfig.public.PROJECT_ID);

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
