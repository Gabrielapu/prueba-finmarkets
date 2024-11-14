<template>
  <div class="chart-wrapper">
    <Line
      ref="chartRef"
      :data="data"
      :options="chartOptions"
    />
  </div>
  <div class="uk-button-group uk-margin-top uk-margin-bottom">
    <button class="uk-button uk-button-small" :class="getBtnClass('1M')" @click="range = '1M'">
      1M
    </button>
    <button class="uk-button uk-button-small" :class="getBtnClass('3M')" @click="range = '3M'">
      3M
    </button>
    <button class="uk-button uk-button-small" :class="getBtnClass('6M')" @click="range = '6M'">
      6M
    </button>
    <button class="uk-button uk-button-small" :class="getBtnClass('1A')" @click="range = '1A'">
      1A
    </button>
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
const range = ref('1M');
const months = {
  1: 'Enero',
  2: 'Febrero',
  3: 'Marzo',
  4: 'Abril',
  5: 'Mayo',
  6: 'Junio',
  7: 'Julio',
  8: 'Agosto',
  9: 'Septiembre',
  10: 'Octubre',
  11: 'Noviembre',
  12: 'Diciembre'
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
    },
    filler: {
      propagate: true,
    }
  }
})

const getBtnClass = (selectedRange) => {
  if(selectedRange === range.value) {
    return 'uk-button-primary'
  }
  return 'uk-button-default'
}

function getLabels() {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const oneMonthInSeconds = 30 * 24 * 60 * 60;
  const threeMonthsInSeconds = 90 * 24 * 60 * 60
  const sixMonthsInSeconds = 180 * 24 * 60 * 60
  const oneYearInSeconds = 365 * 24 * 60 * 60
  let monthCondition = oneMonthInSeconds;

  if(range.value === '3M') {
    monthCondition = threeMonthsInSeconds;
  } else if(range.value === '6M') {
    monthCondition = sixMonthsInSeconds;
  } else if(range.value === '1A') {
    monthCondition = oneYearInSeconds;
  }

  const filteredData = chartData.value?.chart?.filter(item => 
    currentTimestamp - item.datetimeLastPriceTs <= monthCondition
  );
  const tsDates = filteredData?.map(i => i.datetimeLastPriceTs)
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
  height: 220px; 
  margin-right: 20px;
}
</style>