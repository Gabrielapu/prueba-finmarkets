import { defineStore } from 'pinia'

import instruments from '../mocks/constituents/constituentsList.json';
import AguasA from '../mocks/resume/AGUAS-A.json';
import AndinaB from '../mocks/resume/ANDINA-B.json';
import BCI from '../mocks/resume/BCI.json';
import BSantander from '../mocks/resume/BSANTANDER.json';
import CAP from '../mocks/resume/CAP.json';
import IPSA from '../mocks/resume/IPSA.json';

export const useInstrumentStore = defineStore('instrument', {
  state: () => ({
    selectedInstrument: instruments.data.constituents[1],
    instruments: instruments.data.constituents,
    resumeSelectedInstrument: AguasA.data,
    codeIntrumentDictionaty: {
      'AGUAS-A': AguasA,
      'ANDINA-B': AndinaB,
      'BCI': BCI,
      'BSANTANDER': BSantander,
      'CAP': CAP,
      'IPSA': IPSA
    },
    chartData: [],
  }),
  actions: {
    selectInstrument(instrument) {
      this.selectedInstrument = instrument;
      this.resumeSelectedInstrument = this.codeIntrumentDictionaty[instrument.codeInstrument]; 
    },
  },
});