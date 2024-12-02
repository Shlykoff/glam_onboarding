<template>
  <div :class="{ loading: isLoading, loaded: !isLoading }">
    <BarChart
      v-if="!isLoading"
      :started="Number(started)"
      :finished="Number(finished)"
      :step1="Number(step1)"
      :step2="Number(step2)"
      :step3="Number(step3)"
    />
    <p v-else>Loading...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from "vue";
import { getStatistic } from "@/services/getStatistic";
import BarChart from "@/components/BarChart.vue";

const refreshInterval = import.meta.env.VITE_STATISTIC_REFRESH_INTERVAL;

export default defineComponent({
  name: "Statistic",
  components: {
    BarChart,
  },
  setup() {
    const started = ref<number | string>("");
    const finished = ref<number | string>("");
    const step1 = ref<number | string>("");
    const step2 = ref<number | string>("");
    const step3 = ref<number | string>("");
    const isLoading = ref<boolean>(true);

    let intervalId: ReturnType<typeof setInterval> | null = null;

    const fetchStatistic = async (): Promise<void> => {
      try {
        const data = await getStatistic();
        started.value = data.started;
        finished.value = data.finished;
        step1.value = data.step[0];
        step2.value = data.step[1];
        step3.value = data.step[2];
        isLoading.value = false;
      } catch (error) {
        console.error("Get data error:", error);
      }
    };
    onMounted(() => {
      fetchStatistic();
      intervalId = setInterval(fetchStatistic, refreshInterval);
    });

    onUnmounted(() => {
      if (intervalId) clearInterval(intervalId);
    });

    return {
      started,
      finished,
      step1,
      step2,
      step3,
      isLoading,
    };
  },
});
</script>

<style scoped>
.loading {
  opacity: 0;
  pointer-events: none;
}

.loaded {
  opacity: 1;
  transition: opacity 0.3s ease;
}
</style>
