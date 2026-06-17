<!--
=============================================================
  DAY 3 ASSIGNMENT — AboutView.vue
  Static information page for the task app routing demo
=============================================================
-->
<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <div class="about-view">
    <h1>About</h1>
    <p>This is the About page</p>
    <p>Hello! Pew! Pew!</p>
    <button @click="router.back()" class="back-button">← Back</button>
  </div>
</template>

<style scoped>
.about-view {
  max-width: 520px;
  margin: 40px auto;
  padding: 24px;
  font-family: Arial, sans-serif;
}

h1 {
  color: #1b2a4a;
  margin-bottom: 16px;
}

p {
  color: #555;
  line-height: 1.6;
  margin-bottom: 12px;
}

.back-button {
  background: #42b883;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  margin-top: 16px;
}

.back-button:hover {
  background: #359268;
}
</style>
