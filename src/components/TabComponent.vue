<template>
  <ul uk-tab>
    <li 
      v-for="tab, index in tabs" 
      :key="index"
      @click="selectedTab = index"
    >
      <a href="#">{{ tab }}</a>
    </li>
  </ul>
  <div v-if="selectedTab === 0" class="uk-flex">
    <InstrumentListComponent tablePlace="first"   />
    <InstrumentListComponent tablePlace="second"/>
  </div>
  <div v-else>
    Tab sin registros segun JSON de prueba
  </div>
</template>

<script setup>
import { ref } from 'vue';
import InstrumentListComponent from './InstrumentListComponent.vue';

const selectedTab = ref(0);
const tabs = ['IPSA', 'IGPA', 'NASDAQ', 'DOW JONES', 'SP/BVL']
</script>