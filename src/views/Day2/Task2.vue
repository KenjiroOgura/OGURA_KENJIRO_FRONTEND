<template>
  <div style="padding: 20px">
    <h1>Parent Component</h1>

    <p><strong>Message from child:</strong> {{ messageFromChild }}</p>

    <Child :title="parentTitle" @send-message="handleMessage" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Child from "./Child.vue";

const parentTitle = ref("Hello from Parent 👋");
const messageFromChild = ref("No message yet");

function handleMessage(msg) {
  messageFromChild.value = msg;
}
</script>
