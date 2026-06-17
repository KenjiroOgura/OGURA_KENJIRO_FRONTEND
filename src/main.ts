import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./views/Day3/router-index";

createApp(App).use(router).mount("#app");
