<template>
  <table class="table-wrapper uk-table uk-table-small">
    <thead>
      <tr class="border-bottom">
        <th>Nombre</th>
        <th>Último</th>
        <th>Monto (MM)</th>
        <th>Var día</th>
        <th>Var 30d**</th>
        <th>Año actual</th>
        <th>12 Meses</th>
      </tr>
    </thead>
    <tbody>
      <InstrumentItemComponent
        v-for="instrument in instruments"
        :key="instrument.id"
        :instrument="instrument"
        @click="selectInstrument(instrument)"
      />
    </tbody>
    <tfoot>
        <tr>
          <td colspan="7">
            * Último precio. Monto transado y variación diaria con desfase de 15 minutos. 
            Haz click en cada instrumento para ver información actualizada en el gráfico
          </td>
        </tr>
        <tr>
          <td colspan="7">
            ** Variaciones a 30d, Año actual y 12 meses calculadas con el precio de cierre 
            al último día hábil. 
          </td>
        </tr>
    </tfoot>
  </table>
</template>

<script setup>
import { computed } from 'vue';
import { useInstrumentStore } from '../stores/instrument.js';
import InstrumentItemComponent from './InstrumentItemComponent.vue';

const props = defineProps({
  tablePlace: {
    type: String,
    required: true,
    default: 'first',
    validator(value) {
      return ['first', 'second'].includes(value);
    }
  }
})
const store = useInstrumentStore();

const instruments = computed(() => { 
  return props.tablePlace === 'first' ? firstHalf.value : secondHalf.value
});
const firstHalf = computed(() => {
  return store.instruments.slice(0, Math.ceil(store.instruments.length / 2));
})
const secondHalf = computed(() => {
  return store.instruments.slice(Math.ceil(store.instruments.length / 2));
})

const selectInstrument = (instrument) => {
  store.selectInstrument(instrument);
};
</script>

<style scoped>
.uk-table-small {
  font-size: 10px;
}
.border-bottom {
  border-bottom: 0.5px solid rgb(235, 235, 235);
}
th {
  text-transform: none !important;
}
.uk-table {
  margin-top: 0px;
}
.table-wrapper {
  border: 0.5px solid rgb(235, 235, 235);
  border-radius: 5px;
  background-color: #f8f8f8;
}
</style>
