<template>
  <div class="chart-wrapper">
    <Line
      ref="chartRef"
      :data="data"
      :options="chartOptions"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useInstrumentStore } from '../stores/instrument.js';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const store = useInstrumentStore();
const chartData = computed(() => store.chartData?.data);
const chartRef = ref(null);
const ranges = {
  '1M': 30,
  '3M': 90,
  '6M': 180,
  '1A': 365
}
const data = computed(() => ({
  labels: getLabels(),
  datasets: [ 
    {
      data: chartData.value?.chart?.map(item => item.lastPrice),
      fill: { below: 'red' },
      backgroundColor: '#214d8b',
      borderColor: '#3c86d9',
      tension: 0.1,
    } 
  ]
}));
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  maxWidth: '100%',
  maxHeight: '200px',
  plugins: {
    legend: {
      display: false
    }
  }
})

function getLabels(range) {
  const tsDates = chartData.value?.chart?.map(i => i.datetimeLastPriceTs)
  const dates = tsDates?.map(ts => {
    const d = new Date(ts * 1000)
    const year = d.getFullYear();
    const month = d.getMonth() + 1; 
    const day = d.getDate();

    return `${day}-${month}-${year}`;
  })
  return dates
}
</script>

<style scoped>
.chart-wrapper {
  height: 250px; 
  margin-right: 20px;
}
</style>