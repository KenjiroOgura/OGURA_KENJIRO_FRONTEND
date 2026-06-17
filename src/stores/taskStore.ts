import { reactive } from "vue";

const taskStore = reactive({
  tasks: [
    { id: 1, name: "Take a Bath Pls", dueDate: "now" },
    { id: 2, name: "Write report", dueDate: "2026-06-18" },
    { id: 3, name: "Call meeting", dueDate: "2026-06-22" },
  ],
});

export function useTaskStore() {
  return taskStore;
}
