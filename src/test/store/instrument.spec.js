import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia';
import { useInstrumentStore } from '../../stores/instrument.js';

describe('Instrument Store', () => {
  
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  
  test('Set new instrument in store',  () => {
    const store = useInstrumentStore()
    store.selectInstrument({ 
      codeInstrument: "CAP",
      name: "CAP S.A.",
      shortName: "CAP",
      pctDay: -0.878947,
      pct30D: -4.201680672268903,
      pctCY: -20.833333333333336,
      pct1Y: 8.865884869551932,
      lastPrice: 5649.9,
      datetimeLastPrice: "06-11-2024 11:55:50",
      volumeMoney: 100805,
      accumulatedVolumeMoney: 203018194,
      tend: "down",
      performanceAbsolute: -50.100000000000364,
      performanceRelative: -0.878947
    })
    expect(store.selectedInstrument.codeInstrument).toBe('CAP')
    expect(store.selectedInstrument.datetimeLastPrice).toBe('06-11-2024 11:55:50')
    expect(store.selectedInstrument.volumeMoney).toBe(100805)
    expect(store.selectedInstrument.tend).toBe('down')
  })

  test('Set resume in store',  () => {
    const store = useInstrumentStore()
    const currentResume = store.resumeSelectedInstrument
    store.selectInstrument({ 
      codeInstrument: "CAP",
    })
    expect(store.resumeSelectedInstrument.data).not.toBeNull()
    expect(store.resumeSelectedInstrument.data.price).not.toBeNull()
    expect(store.resumeSelectedInstrument.data.info).not.toBeNull()
    expect(currentResume.data.info.name).not.toBe(store.resumeSelectedInstrument.data.info.name)
  })

  test('Set chart data', () => {
    const store = useInstrumentStore()
    const currentChartData = store.chartData
    store.selectInstrument({ 
      codeInstrument: "CAP",
    })
    expect(store.chartData).not.toBeNull()
    expect(currentChartData.data.info.name).not.toBe(store.chartData.data.info.name)
  })
})