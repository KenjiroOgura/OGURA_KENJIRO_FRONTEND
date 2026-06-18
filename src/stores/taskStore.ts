import { computed, ref } from "vue";
import { defineStore } from "pinia";

type Task = {
  id: number;
  name: string;
  done: boolean;
  dueDate?: string;
};

export const useTaskStore = defineStore("tasks", () => {
  const tasks = ref<Task[]>([
    { id: 1, name: "Take a Bath Pls", done: false, dueDate: "now" },
    { id: 2, name: "Write report", done: false, dueDate: "2026-06-18" },
    { id: 3, name: "Call meeting", done: false, dueDate: "2026-06-22" },
  ]);

  const nextId = ref(4);

  const totalCount = computed(() => tasks.value.length);
  const doneCount = computed(
    () => tasks.value.filter((task) => task.done).length,
  );
  const pendingCount = computed(
    () => tasks.value.filter((task) => !task.done).length,
  );

  function addTask(name: string) {
    const trimmed = name.trim();
    if (!trimmed) return;

    tasks.value.push({
      id: nextId.value++,
      name: trimmed,
      done: false,
    });
  }

  function toggleTask(id: number) {
    const task = tasks.value.find((task) => task.id === id);
    if (!task) return;
    task.done = !task.done;
  }

  function removeTask(id: number) {
    tasks.value = tasks.value.filter((task) => task.id !== id);
  }

  return {
    tasks,
    totalCount,
    doneCount,
    pendingCount,
    addTask,
    toggleTask,
    removeTask,
  };
});
