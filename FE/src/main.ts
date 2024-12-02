import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { useOnboardingStore } from "./store/onboarding";

const app = createApp(App);
app.use(createPinia());

useOnboardingStore().loadVideos();

app.use(router);
app.mount("#app");
