import { defineStore } from 'pinia'

import instruments from '../mocks/constituents/constituentsList.json';

import AguasA from '../mocks/resume/AGUAS-A.json';
import AndinaB from '../mocks/resume/ANDINA-B.json';
import BCI from '../mocks/resume/BCI.json';
import BSantander from '../mocks/resume/BSANTANDER.json';
import CAP from '../mocks/resume/CAP.json';
import IPSA from '../mocks/resume/IPSA.json';

import HAguasA from '../mocks/history/history-AGUAS-A.json';
import HAndinaB from '../mocks/history/history-ANDINA-B.json';
import HBCI from '../mocks/history/history-BCI.json';
import HBSantander from '../mocks/history/history-BSANTANDER.json';
import HCAP from '../mocks/history/history-CAP.json';
import HIPSA from '../mocks/history/history-IPSA.json';

export const useInstrumentStore = defineStore('instrument', {
  state: () => ({
    selectedInstrument: instruments.data.constituents[0],
    instruments: instruments.data.constituents,
    resumeSelectedInstrument: AguasA,
    codeIntrumentDictionatyForResume: {
      'AGUAS-A': AguasA,
      'ANDINA-B': AndinaB,
      'BCI': BCI,
      'BSANTANDER': BSantander,
      'CAP': CAP,
      'IPSA': IPSA
    },
    codeInstrumentDictionaryForHistory: {
      'AGUAS-A': HAguasA,
      'ANDINA-B': HAndinaB,
      'BCI': HBCI,
      'BSANTANDER': HBSantander,
      'CAP': HCAP,
      'IPSA': HIPSA
    },
    chartData: HAguasA,
  }),
  actions: {
    selectInstrument(instrument) {
      console.log(instrument)
      this.selectedInstrument = instrument;
      this.resumeSelectedInstrument = this.codeIntrumentDictionatyForResume[instrument.codeInstrument]; 
      this.chartData = this.codeInstrumentDictionaryForHistory[instrument.codeInstrument];
    },
  },
});