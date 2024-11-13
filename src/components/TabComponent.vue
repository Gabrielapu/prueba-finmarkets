<template>
  <ul uk-tab>
    <li 
      v-for="tab, index in tabs" 
      :key="index"
    >
      <a href="#">{{ tab.name }}</a>
    </li>
  </ul>
</template>

<script setup>
const props = defineProps({
  tabs: Array
})
</script>