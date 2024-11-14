import { defineStore } from 'pinia'
import instruments from '../mocks/constituents/constituentsList.json';
import resume from '../mocks/resume/ANDINA-B.json';
import history from '../mocks/history/history-ANDINA-B.json';

export const useInstrumentStore = defineStore('instrument', {
  state: () => ({
    selectedInstrument: instruments.data.constituents[1],
    instruments: instruments.data.constituents,
    resumeSelectedInstrument: resume.data,
    chartData: history.data,
  }),
  actions: {
    selectInstrument(instrument) {
      this.selectedInstrument = instrument;
      this.chartData = []
    },
  },
});