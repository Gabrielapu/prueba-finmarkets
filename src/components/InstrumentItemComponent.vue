<template>
  <tr class="table-row cursor-pointer tr-hover" @click="onClick">
    <td>
      {{ instrument.name }}
    </td>
    <td>
      {{ instrument.lastPrice }}
    </td>
    <td>
      {{ useThousandSeparator(instrument.accumulatedVolumeMoney) }}
    </td>
    <td class="text-right">
      <b :class="getVariationClass(instrument.pctDay)"> 
        {{ instrument.pctDay.toFixed(2) }}% 
      </b>
    </td>
    <td>
      <b :class="getVariationClass(instrument.pct30D)"> 
        {{ instrument.pct30D.toFixed(2) }}%
      </b>
    </td>
    <td>
      <b :class="getVariationClass(instrument.pctCY)">
        {{ instrument.pctCY.toFixed(2) }}% 
      </b>
    </td>
    <td>
      <b :class="getVariationClass(instrument.pct1Y)"> 
        {{ instrument.pct1Y.toFixed(2) }}%
      </b>
    </td> 
  </tr>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import useThousandSeparator from '../composables/useThousandSeparator';

const props = defineProps(['instrument']);
const emit = defineEmits(['click']);

const onClick = () => {
  emit('click', props.instrument);
};

const getVariationClass = (variation) => {
  if(variation > 0) {
    return 'uk-text-success';
  } else if(variation <= 0) {
    return 'uk-text-danger';  
  }
}
</script>

<style scoped>
.uk-table-small td {
  padding: 1px 10px;
}
.text-right {
  text-align: right;
}
.cursor-pointer {
  cursor: pointer;
}
.tr-hover {
  transition: background-color 0.2s ease-in-out;
}
.tr-hover:hover {
  background-color: rgb(235, 235, 235);
}
</style>