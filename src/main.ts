import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import TaskListView from "./views/Day4/TaskListView.vue";

const app = createApp(TaskListView);

app.use(createPinia());
app.mount("#app");
