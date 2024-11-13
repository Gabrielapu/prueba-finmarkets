import { defineStore } from 'pinia'
import instruments from '../mocks/constituents/constituentsList.json';
import resume from '../mocks/resume/ANDINA-B.json';

export const useInstrumentStore = defineStore('instrument', {
  state: () => ({
    selectedInstrument: instruments.data.constituents[1],
    instruments: instruments.data.constituents,
    resumeSelectedInstrument: resume.data,
    chartData: null,
  }),
  actions: {
    selectInstrument(instrument) {
      this.selectedInstrument = instrument;
      this.chartData = this.fetchChartData(instrument);
    },
    fetchChartData(instrument) {
      // Simulación: Devuelve datos ficticios
      return {
        labels: ['Jan', 'Feb', 'Mar'],
        datasets: [{
          label: instrument.name,
          data: [10, 20, 30],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
        }],
      };
    },
  },
});