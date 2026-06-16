<!--
=============================================================
  DAY 2 ASSIGNMENT — TaskListView.vue (Parent Component)
  This file renders a list of TaskCard components.
=============================================================
-->
<script setup>
import { computed, ref } from "vue";
import TaskCard from "./TaskCard.vue";

const tasks = ref([
  { id: "1", name: "Buy milk", done: false, dueDate: "2026-06-20" },
  { id: "2", name: "Write report", done: true, dueDate: "2026-06-18" },
  { id: "3", name: "Call meeting", done: false, dueDate: "2026-06-22" },
]);

const task = ref({ id: "", name: "", done: false });

function handleComplete(id) {
  const t = tasks.value.find((x) => x.id === id);
  if (t) t.done = !t.done;
}

function handleDelete(id) {
  tasks.value = tasks.value.filter((t) => t.id !== id);
}
</script>

<template>
  <div class="task-list-view">
    <h1>My Tasks</h1>

    <div class="task-grid">
      <TaskCard
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @complete="handleComplete"
        @delete="handleDelete"
      >
        <template #meta>Due: {{ task.dueDate }}</template>
      </TaskCard>
      <p class="empty" v-if="tasks.length === 0">
        No tasks yet. Add one above!
      </p>
    </div>
  </div>
</template>

<style scoped>
.task-list-view {
  max-width: 520px;
  margin: 40px auto;
  padding: 24px;
  font-family: Arial, sans-serif;
}
h1 {
  color: #1b2a4a;
  margin-bottom: 24px;
}
</style>
