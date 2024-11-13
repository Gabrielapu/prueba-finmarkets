
<template>
  <h5 class="text-center">Resumen</h5>
  <hr class="uk-margin-small">
  <div class="uk-flex uk-flex-between">
    <span>Cotización</span>
    <b>{{ selectedInstrument.datetimeLastPrice }}</b>
  </div>
  <div class="uk-flex uk-flex-between">
    <span>MERCADO</span>
    <b>{{ resumeSelectedInstrument.info.marketName }}</b>
  </div>
  <div class="uk-flex uk-flex-between">
    <span>APERTURA</span>
    <b>{{ resumeSelectedInstrument.price.openPrice }}</b>
  </div>
  <div class="uk-flex uk-flex-between">
    <span>CIERRE ANTERIOR</span>
    <b>{{ resumeSelectedInstrument.price.closePrice }}</b>
  </div>
  <div class="uk-flex uk-flex-between">
    <span>MÁXIMO DIARIO</span>
    <b>{{ resumeSelectedInstrument.price.maxDay }}</b>
  </div>
  <div class="uk-flex uk-flex-between">
    <span>MÍNIMO DIARIO</span>
    <b>{{ resumeSelectedInstrument.price.minDay }}</b>
  </div>
  <div class="uk-flex uk-flex-between">
    <span>MÁXIMO 52 SEMANAS</span>
    <b>{{ resumeSelectedInstrument.price.max52W }}</b>
  </div>
  <div class="uk-flex uk-flex-between">
    <span>MÍNIMO 52 SEMANAS</span>
    <b>{{ resumeSelectedInstrument.price.min52W }}</b>
  </div>
  <br>
  <div class="uk-flex uk-flex-between">
    <span>Variación**</span>
    <b>%</b>
  </div>
  <hr class="uk-margin-small">
  <div class="uk-flex uk-flex-between">
    <span>1 MES</span>
    <b :class="getVariationClass(resumeSelectedInstrument.price.pct30D)">
      {{ resumeSelectedInstrument.price.pct30D.toFixed(2) }}%
    </b>
  </div>
  <div class="uk-flex uk-flex-between">
    <span>1 AÑO</span>
    <b :class="getVariationClass(resumeSelectedInstrument.price.pctRelW52)">
      {{ resumeSelectedInstrument.price.pctRelW52.toFixed(2) }}%
    </b>
  </div>
  <div class="uk-flex uk-flex-between">
    <span>AÑO A LA FECHA</span>
    <b :class="getVariationClass(resumeSelectedInstrument.price.pctRelCY)">
      {{ resumeSelectedInstrument.price.pctRelCY.toFixed(2) }}%
    </b>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useInstrumentStore } from '../stores/instrument.js';

const store = useInstrumentStore();
const selectedInstrument = computed(() => store.selectedInstrument);
const resumeSelectedInstrument = computed(() => store.resumeSelectedInstrument);

const getVariationClass = (variation) => {
  if(variation > 0) {
    return 'uk-text-success';
  } else if(variation <= 0) {
    return 'uk-text-danger';  
  }
}
</script>