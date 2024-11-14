<template>
  <div class="uk-margin-large-right">
    <h4><b>{{ selectedInstrument?.name || 'Seleccione un instrumento' }}</b></h4>
    <span>Indice</span>
    <hr class="uk-margin-small">
    <p class="uk-margin-small" v-if="selectedInstrument">
      Valor Actual 
      <span :uk-icon="getIconClass"></span>
      <b>{{ selectedInstrument.lastPrice }}</b>
      
      &nbsp;&nbsp;
      
      Var.% Actual 
      <span 
        class="uk-text-bold" 
        :class="getVariationClass(selectedInstrument.performanceRelative)"
      >
        {{ selectedInstrument.performanceRelative.toFixed(2) }}
      </span>
      
      &nbsp;&nbsp;
      
      Var. Puntos Actual
      <span 
        class="uk-text-bold" 
        :class="getVariationClass(selectedInstrument.performanceAbsolute)"
      >
        {{ selectedInstrument.performanceAbsolute.toFixed(2) }}
      </span>
    </p>
    <hr class="uk-margin-small">
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useInstrumentStore } from '../stores/instrument.js';

const store = useInstrumentStore();
const selectedInstrument = computed(() => store.selectedInstrument);

const getIconClass = computed(() => {
  const tendOptions = {
    'up': 'arrow-up',
    'down': 'arrow-down',
    'same': ''
  }
  return tendOptions[selectedInstrument.value.tend];
})

const getVariationClass = (variation) => {
  if(variation > 0) {
    return 'uk-text-success';
  } else if(variation <= 0) {
    return 'uk-text-danger';  
  }
}
</script>