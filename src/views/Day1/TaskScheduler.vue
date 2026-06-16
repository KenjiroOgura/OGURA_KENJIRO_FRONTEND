<!--
=============================================================
  DAY 1 ASSIGNMENT — Reactive Task Counter App
  Topic: Vue 3 Composition API (ref, computed, v-model, v-for)
  Time: 60 minutes
=============================================================

OBJECTIVE
---------
Build a reactive task management app that demonstrates Vue 3's
reactivity system. You will use ref(), computed(), v-model, v-for,
and event handling — the core building blocks of every Vue app.

WHAT TO BUILD
-------------
A single-file Vue component (this file) that:

  1. Has a text input + "Add Task" button to create new tasks.
  2. Displays the task list, each item with:
       - A checkbox to mark it as done
       - The task name (strike-through when done)
       - A "Remove" button
  3. Shows a live stats bar:
       Total Tasks | Done: X | Pending: X
  4. Shows an empty state message when there are no tasks.

REQUIREMENTS (Acceptance Criteria)
------------------------------------
  [x] Use ref() for the text input value
  [x] Use ref() for the tasks array
  [x] Use computed() for total, done, and pending counts
  [x] Use v-model on the text input
  [x] Use v-for with :key to render the task list
  [x] Use @keyup.enter on the input to also trigger addTask
  [x] Prevent adding empty/whitespace-only tasks
  [x] Clear the input after adding a task

EXTENSION (if you finish early)
---------------------------------
  - Add a filter bar: All | Done | Pending — filters the visible list
  - Add a "Clear All Done" button that removes all completed tasks
  - Add a task priority: Low / Medium / High (use a <select> dropdown)

HINTS (read only if stuck)
---------------------------
  Hint 1: import { ref, computed } from 'vue'
  Hint 2: tasks.value.push({ id: Date.now(), name: '...', done: false })
  Hint 3: computed(() => tasks.value.filter(t => t.done).length)
  Hint 4: For :class strikethrough — :class="{ done: task.done }"
  Hint 5: v-model on a checkbox binds to a boolean — v-model="task.done"
  Hint 6: To prevent empty tasks — if (!newTaskName.value.trim()) return

FILE STRUCTURE (this is a single-file component)
-------------------------------------------------
  <script setup>  — all your reactive logic goes here
  <template>      — your HTML markup
  <style scoped>  — your CSS (scoped = only applies to this component)
=============================================================
-->

<script setup>
import { ref, computed } from "vue";

const newTaskName = ref("");

const tasks = ref([]);

const totalCount = computed(() => {
  return tasks.value.length;
});

const doneCount = computed(() => {
  return tasks.value.filter((t) => t.done).length;
});

const pendingCount = computed(() => {
  return tasks.value.filter((t) => !t.done).length;
});

function addTask() {
  if (!newTaskName.value.trim()) {
    return;
  }

  tasks.value.push({
    id: Date.now(),
    name: newTaskName.value,
    done: false,
  });

  newTaskName.value = "";
}

function removeTask(id) {
  // YOUR CODE: Remove task with the given id
  tasks.value = tasks.value.filter((t) => t.id !== id);
}
</script>

<template>
  <div class="scheduler-container">
    <header class="scheduler-header">
      <div class="header-content">
        <h1>Task Scheduler</h1>
        <div class="stats">
          <span class="stat-item"
            >{{ doneCount }}/{{ totalCount }} completed</span
          >
        </div>
      </div>
    </header>

    <div class="scheduler-content">
      <div class="task-form-section">
        <h2>Add Task</h2>
        <form class="task-form" @submit.prevent="addTask">
          <div class="form-group">
            <label for="title">Task Title</label>
            <input
              id="title"
              v-model="newTaskName"
              type="text"
              placeholder="Enter task title"
              class="form-input"
              @keyup.enter="submit"
            />
          </div>

          <button type="submit" class="btn btn-primary">Add Task</button>
        </form>
      </div>

      <div class="tasks-section">
        <h2>Pending Tasks ({{ pendingCount }})</h2>

        <div class="tasks-list">
          <div
            v-for="task in tasks.filter((t) => !t.done)"
            :key="task.id"
            class="task-item"
          >
            <div class="task-checkbox">
              <input type="checkbox" v-model="task.done" />
            </div>

            <div class="task-content">
              <div class="task-title-row">
                <h3 class="task-title">{{ task.name }}</h3>
              </div>
            </div>

            <button class="btn-delete" @click="removeTask(task.id)">
              Delete
            </button>
          </div>
        </div>
      </div>

      <div class="tasks-section">
        <h2>Done Tasks ({{ doneCount }})</h2>

        <div class="tasks-list">
          <div
            v-for="task in tasks.filter((t) => t.done)"
            :key="task.id"
            class="task-item completed"
          >
            <div class="task-checkbox">
              <input type="checkbox" v-model="task.done" />
            </div>

            <div class="task-content">
              <div class="task-title-row">
                <h3 class="task-title">{{ task.name }}</h3>
              </div>
            </div>

            <button class="btn-delete" @click="removeTask(task.id)">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scheduler-container {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.scheduler-header {
  margin-bottom: 40px;
  border-bottom: 2px solid var(--border);
  padding-bottom: 20px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.scheduler-header h1 {
  margin: 0;
  color: var(--text-h);
}

.stats {
  display: flex;
  gap: 20px;
  align-items: center;
}

.stat-item {
  padding: 8px 16px;
  background: var(--accent-bg);
  border: 1px solid var(--accent-border);
  border-radius: 8px;
  color: var(--accent);
  font-weight: 500;
}

.scheduler-content {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.task-form-section {
  background: var(--bg);
  padding: 24px;
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: var(--shadow);
}

.task-form-section h2 {
  margin-top: 0;
  color: var(--text-h);
}

.task-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 500;
  color: var(--text-h);
  font-size: 14px;
}

.form-input {
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--bg);
  color: var(--text);
  font-family: var(--sans);
  font-size: 14px;
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-bg);
}

textarea.form-input {
  resize: vertical;
  font-family: var(--sans);
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: var(--accent);
  color: white;
  align-self: flex-start;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

.controls-section {
  display: flex;
  gap: 30px;
  padding: 20px;
  background: var(--accent-bg);
  border-radius: 12px;
  border: 1px solid var(--accent-border);
  flex-wrap: wrap;
  align-items: center;
}

.filter-group,
.sort-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.filter-group label,
.sort-group label {
  font-weight: 500;
  color: var(--text-h);
  font-size: 14px;
  white-space: nowrap;
}

.button-group {
  display: flex;
  gap: 8px;
}

.filter-btn {
  padding: 8px 16px;
  border: 1px solid var(--accent-border);
  background: transparent;
  color: var(--accent);
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn.active {
  background: var(--accent);
  color: white;
}

.filter-btn:hover {
  background: var(--accent);
  color: white;
}

.sort-select {
  width: 150px;
}

.tasks-section {
  padding: 24px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--bg);
}

.tasks-section h2 {
  margin-top: 0;
  color: var(--text-h);
}

.tasks-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.task-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--bg);
  transition: all 0.2s;
}

.task-item:hover {
  box-shadow: var(--shadow);
  border-color: var(--accent-border);
}

.task-item.completed {
  background: rgba(0, 0, 0, 0.02);
  opacity: 0.7;
}

.task-item.completed .task-title {
  text-decoration: line-through;
  color: var(--text);
}

.task-checkbox {
  flex-shrink: 0;
  padding-top: 2px;
}

.task-checkbox input {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: var(--accent);
}

.task-content {
  flex: 1;
  min-width: 0;
}

.task-title-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.task-title {
  margin: 0;
  color: var(--text-h);
  font-size: 16px;
  font-weight: 500;
}

.priority-badge {
  flex-shrink: 0;
  padding: 4px 10px;
  border-radius: 4px;
  color: white;
  font-size: 12px;
  font-weight: 600;
}

.task-description {
  margin: 0 0 8px 0;
  color: var(--text);
  font-size: 14px;
  line-height: 1.4;
}

.task-meta {
  display: flex;
  gap: 12px;
  font-size: 13px;
  color: var(--text);
}

.task-date {
  display: flex;
  align-items: center;
  gap: 4px;
}

.btn-delete {
  flex-shrink: 0;
  padding: 8px 12px;
  background: transparent;
  color: #ff6b6b;
  border: 1px solid #ff6b6b;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-delete:hover {
  background: #ff6b6b;
  color: white;
}

/* Responsive */
@media (max-width: 768px) {
  .scheduler-container {
    padding: 12px;
  }

  .header-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .controls-section {
    flex-direction: column;
    align-items: flex-start;
  }

  .button-group {
    flex-wrap: wrap;
  }

  .task-item {
    flex-wrap: wrap;
  }

  .task-title-row {
    width: 100%;
  }

  .btn-delete {
    align-self: flex-end;
  }
}
</style>
