<template>
  <div class="landing wrapper">
    <h1 class="title">Welcome to Glam!</h1>
    <button class="button-start" @click="startOnboarding">Get Started</button>
  </div>
</template>

<script lang="ts">
import { sendStatistic } from "@/services/sendStatistic";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "LandingPage",
  setup() {
    const router = useRouter();

    const startOnboarding = async (): Promise<void> => {
      await sendStatistic({ isStarted: true, step: 1 });
      router.push("/onboarding");
    };

    return { startOnboarding };
  },
});
</script>

<style scoped>
.landing {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-color: rgb(46, 46, 46);
}
</style>
