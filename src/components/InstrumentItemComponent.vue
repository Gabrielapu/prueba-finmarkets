<template>
  <li @click="onClick">
    <span>{{ instrument.name }}</span>
    <span>{{ instrument.value }}</span>
  </li>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps(['instrument']);
const emit = defineEmits(['click']);

const onClick = () => {
  emit('click', instrument);
};
</script>
