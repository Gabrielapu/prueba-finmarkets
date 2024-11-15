<template>
  <div class="dropdown">
    <span class="uk-form-icon" uk-icon="icon: search"></span>
    <input
      type="text"
      v-model="searchQuery"
      :placeholder="selectedInstrument 
        ? selectedInstrument.codeInstrument 
        : 'Busca un instrumento'"
      @focus="showDropdown = true"
      @focusout="onFocusout()"
      @keyup.escape="onEscape()"
      class="uk-input uk-width-expand"
    />
    <ul 
      v-if="showDropdown" 
      class="dropdown-list uk-list uk-list-collapse uk-margin-remove"
    >
      <li 
        v-for="(option, index) in filteredOptions" 
        :key="index"
        @click="setNewInstrument(option)"
      >
        <span>{{ option }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useInstrumentStore } from '../stores/instrument.js';

const store = useInstrumentStore();
const searchQuery = ref('');
let showDropdown = ref(false);

const instrumentList = computed(() => {
  return store.instruments.map(i => i.codeInstrument);
})

const selectedInstrument = computed(() => {
  return store.selectedInstrument
})

const onEscape = () => {
  showDropdown.value = false
  searchQuery.value = ''
}

const onFocusout = () => {
  setTimeout(() => {
    searchQuery.value = ''
    showDropdown.value = false
  }, 100)
}

const setNewInstrument = (instrument) => {
  showDropdown.value = false
  const selectedInstrument = store.instruments
    .find(i => i.codeInstrument === instrument);
  store.selectInstrument(selectedInstrument);
}

const filteredOptions = computed(() => {
  return instrumentList.value.filter((option) => {
    return option.toLowerCase().includes(searchQuery?.value.toLowerCase());
  });
});

</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
  width: 100%;
  margin-bottom: 10px;
  z-index: 1;
}

input[type="text"] {
  padding: 10px;
  border: 0.5px solid #ccc;
  border-radius: 5px;
}

.dropdown-list {
  display: block;
  position: absolute;
  top: 100%;
  left: 0;
  border: 1px solid #ccc;
  padding: 5px 15px 5px 15px;
  max-height: 200px; 
  overflow-y: scroll;
  width: 98%;
}
li {
  margin-bottom: 10px;
  text-decoration: none;
  color: #337ab7;
  cursor: pointer;
}

li:hover {
  color: #092741;
  font-weight: bold;
}
</style>