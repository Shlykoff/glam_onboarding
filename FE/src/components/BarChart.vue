<template>
  <div class="container">
    <h1>STATISTIC</h1>
    <Bar :data="chartData" :options="chartOptions" ref="chartRef" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Tooltip,
  BarElement,
  CategoryScale,
  LinearScale,
  ChartOptions,
  ChartData,
  Chart,
} from "chart.js";

ChartJS.register(Tooltip, BarElement, CategoryScale, LinearScale);

export default defineComponent({
  name: "BarChart",
  components: {
    Bar,
  },
  props: {
    started: {
      type: Number,
      required: true,
    },
    finished: {
      type: Number,
      required: true,
    },
    step1: {
      type: Number,
      required: true,
    },
    step2: {
      type: Number,
      required: true,
    },
    step3: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const chartRef = ref<{ chart: Chart } | null>(null);
    const chartData = computed<ChartData<"bar", number[], string>>(() => ({
      labels: ["Started", "Step 1", "Step 2", "Step 3", "Finished"],
      datasets: [
        {
          label: "Progress",
          data: [
            props.started,
            props.step1,
            props.step2,
            props.step3,
            props.finished,
          ],
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    }));
    const chartOptions = ref<ChartOptions<"bar">>({
      responsive: true,
      plugins: {
        tooltip: {
          enabled: true,
        },
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    });

    watch(
      () => [
        props.started,
        props.finished,
        props.step1,
        props.step2,
        props.step3,
      ],
      () => {
        if (chartRef.value && chartRef.value.chart) {
          chartRef.value.chart.update();
        }
      }
    );
    return {
      chartData,
      chartOptions,
      chartRef,
    };
  },
});
</script>

<style scoped>
.container {
  display: grid;
  place-items: center;
  height: 100vh;
}
</style>
