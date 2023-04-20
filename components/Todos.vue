<template>
  <div class="container">
    <h1 class="heading-level-1">{{ name }}</h1>
    <input
      type="text"
      class="input-text"
      placeholder="enter item"
      :style="{ 'margin-top': 1 + 'em' }" />

    <div :style="{ 'margin-top': marginTop + 'em' }">
      <ul class="list">
        <li class="list-item u-flex u-main-space-between u-cross-center">
          <span class="text">Build UI for MidJourney</span>
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
const name = ref("Add tooodooos");

const marginTop = ref("2");
const space = ref(1);
</script>
