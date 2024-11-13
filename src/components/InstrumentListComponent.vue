<template>
  <ul>
    <InstrumentItemComponent
      v-for="instrument in instruments"
      :key="instrument.id"
      :instrument="instrument"
      @click="selectInstrument(instrument)"
    />
  </ul>
</template>

<script setup>
import { computed } from 'vue';
import { useInstrumentStore } from '../stores/instrument.js';
import InstrumentItemComponent from './InstrumentItemComponent.vue';

const store = useInstrumentStore();
const instruments = computed(() => store.instruments);

const selectInstrument = (instrument) => {
  store.selectInstrument(instrument);
};
</script>
