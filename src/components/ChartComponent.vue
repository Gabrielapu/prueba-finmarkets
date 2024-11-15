<template>
  <div class="chart-wrapper">
    <div class="chart">
      <Line
        ref="chartRef"
        :data="data"
        :options="chartOptions"
      />
    </div>
    <div class="uk-button-group uk-margin-top uk-margin-bottom uk-margin-left">
      <button
        id="onemonth-button"
        class="uk-button uk-button-small" 
        :class="getBtnClass('1M')" 
        @click="range = '1M'"
      >
        1M
      </button>
      <button
        id="threemonth-button" 
        class="uk-button uk-button-small" 
        :class="getBtnClass('3M')" 
        @click="range = '3M'"
      >
        3M
      </button>
      <button
        id="sixmonth-button"
        class="uk-button uk-button-small"
        :class="getBtnClass('6M')" 
        @click="range = '6M'"
      >
        6M
      </button>
      <button
        id="oneyear-button" 
        class="uk-button uk-button-small" 
        :class="getBtnClass('1A')" 
        @click="range = '1A'"
      >
        1A
      </button>
  </div>
</div>
</template>

<script setup>
import { ref, computed } from 'vue';
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
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  maxWidth: '100%',
  maxHeight: '200px',
  plugins: {
    legend: {
      display: false,
    },
    filler: {
      propagate: true,
    }
  },
  scales: {
    x: {
      ticks: {
        color: 'white', // Change X-axis label font color
      },
    },
    y: {
      ticks: {
        color: 'white', // Change Y-axis label font color
      },
    },
  },
})

const data = computed(() => ({
  labels: getLabels(),
  datasets: [ 
    {
      data: chartData.value?.chart?.map(item => item.lastPrice),
      fill: { below: 'red' },
      backgroundColor: '#ff0034',
      borderColor: '#e76a41',
      tension: 0.1,
    } 
  ]
}));

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

  const conditionsByRange = {
    '1M': oneMonthInSeconds,
    '3M': threeMonthsInSeconds,
    '6M': sixMonthsInSeconds,
    '1A': oneYearInSeconds
  }

  const filteredInstruments = chartData.value?.chart?.filter(item => 
    currentTimestamp - item.datetimeLastPriceTs <= conditionsByRange[range.value]
  );
  const tsDates = filteredInstruments?.map(i => i.datetimeLastPriceTs)
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
.chart {
  height: 220px; 
  margin-right: 20px;
}
.chart-wrapper {
  padding: 10px;
  margin-right: 15px;
  border: 0.5px solid rgb(235, 235, 235);
  border-radius: 5px;
  margin-bottom: 15px;
}
</style>