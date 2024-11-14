<template>
  <div>
    <BarChart :chart-data="chartData.chart" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useInstrumentStore } from '../stores/instrument.js';
import { defineAsyncComponent } from 'vue';

const BarChart = defineAsyncComponent(() => import('vue-chartjs'));
const store = useInstrumentStore();
const chartData = computed(() => store.chartData);
</script>
