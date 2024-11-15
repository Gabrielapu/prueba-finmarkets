
<template>
  <div class="resume-wrapper">
    <h4 class="text-center title">Resumen</h4>
    <hr class="uk-margin-small">
    <div class="uk-flex uk-flex-between">
      <span>Cotización</span>
      <b>{{ selectedInstrument.datetimeLastPrice }}</b>
    </div>
    <br>
    <div class="uk-flex uk-flex-between">
      <span>MERCADO</span>
      <b>{{ resumeSelectedInstrument?.info?.marketName || 'N/A' }}</b>
    </div>
    <div class="uk-flex uk-flex-between">
      <span>APERTURA</span>
      <b>{{ resumeSelectedInstrument?.price?.openPrice || 0}}</b>
    </div>
    <div class="uk-flex uk-flex-between">
      <span>CIERRE ANTERIOR</span>
      <b>{{ resumeSelectedInstrument?.price?.closePrice || 0}}</b>
    </div>
    <div class="uk-flex uk-flex-between">
      <span>MÁXIMO DIARIO</span>
      <b>{{ resumeSelectedInstrument?.price?.maxDay || 0}}</b>
    </div>
    <div class="uk-flex uk-flex-between">
      <span>MÍNIMO DIARIO</span>
      <b>{{ resumeSelectedInstrument?.price?.minDay || 0}}</b>
    </div>
    <div class="uk-flex uk-flex-between">
      <span>MÁXIMO 52 SEMANAS</span>
      <b>{{ resumeSelectedInstrument?.price?.max52W || 0}}</b>
    </div>
    <div class="uk-flex uk-flex-between">
      <span>MÍNIMO 52 SEMANAS</span>
      <b>{{ resumeSelectedInstrument?.price?.min52W || 0}}</b>
    </div>
    <br>
    <div class="uk-flex uk-flex-between">
      <span>Variación**</span>
      <b>%</b>
    </div>
    <hr>
    <div class="uk-flex uk-flex-between">
      <span>1 MES</span>
      <b 
        v-if="selectedResume" 
        :class="getVariationClass(resumeSelectedInstrument.price.pct30D)"
      >
        {{ resumeSelectedInstrument.price.pct30D.toFixed(2) }}%
      </b>
    </div>
    <div class="uk-flex uk-flex-between">
      <span>1 AÑO</span>
      <b 
        v-if="selectedResume" 
        :class="getVariationClass(resumeSelectedInstrument.price.pctRelW52)"
      >
        {{ resumeSelectedInstrument.price.pctRelW52.toFixed(2) }}%
      </b>
    </div>
    <div class="uk-flex uk-flex-between">
      <span>AÑO A LA FECHA</span>
      <b 
        v-if="selectedResume" 
        :class="getVariationClass(resumeSelectedInstrument.price.pctRelCY)"
      >
        {{ resumeSelectedInstrument.price.pctRelCY.toFixed(2) }}%
      </b>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useInstrumentStore } from '../stores/instrument.js';

const store = useInstrumentStore();
const selectedInstrument = computed(() => store.selectedInstrument);
const resumeSelectedInstrument = computed(() => store.resumeSelectedInstrument?.data || {});

const selectedResume = computed(() => {
  return store.resumeSelectedInstrument?.data;
})

const getVariationClass = (variation) => {
  if(variation > 0) {
    return 'uk-text-success';
  } else if(variation <= 0) {
    return 'uk-text-danger';  
  }
}
</script>

<style scoped>
.title {
  margin-bottom: 0;
}
.resume-wrapper {
  padding: 10px;
  border: 0.5px solid rgb(235, 235, 235);
  border-radius: 5px;
}
</style>