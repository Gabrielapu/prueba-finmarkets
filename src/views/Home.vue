<template>
  <div class="uk-margin-top uk-margin-left uk-margin-right uk-margin-bottom">
    <SearchBarComponent />
    <div class="uk-flex">
      <div class="uk-width-3-4">
        <HeaderComponent />
      </div>
      <div class="uk-width-1-4">
        <SummaryComponent/>
      </div>
    </div>
  </div>
</template>

<script setup>
import HeaderComponent from '../components/HeaderComponent.vue';
import SearchBarComponent from '../components/SearchBarComponent.vue';
import TabComponent from '../components/TabComponent.vue';
import InstrumentListComponent from '../components/InstrumentListComponent.vue';
import SummaryComponent from '../components/SummaryComponent.vue';
import ChartComponent from '../components/ChartComponent.vue';
</script>
