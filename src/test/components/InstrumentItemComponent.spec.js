import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia';
import { useInstrumentStore } from '../../stores/instrument.js';
import InstrumentItemComponent from '../../components/InstrumentItemComponent.vue'

describe('InstrumentItemComponent', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  const wrapper = mount(InstrumentItemComponent, {
    props: {
      instrument: {
        codeInstrument: "BCI",
        name: "BANCO DE CREDITO E INVERSIONES",
        shortName: "BCI",
        pctDay: -0.173145,
        pct30D: 0.5435748037091015,
        pctCY: 18.65828092243187,
        pct1Y: 25.77777777777779,
        lastPrice: 28251,
        datetimeLastPrice: "06-11-2024 12:20:10",
        volumeMoney: 28393,
        accumulatedVolumeMoney: 1671056841,
        tend: "down",
        performanceAbsolute: -49,
        performanceRelative: -0.173145
      }
    },
    global: {
      plugins: [createPinia()],
    },
  })
  const store = useInstrumentStore()

  test('El evento click en un registro selecciona un nuevo instrumento', async () => {
    const currentInstrument = store.selectedInstrument
    wrapper.findAll('tr').at(0).trigger('click')
    await wrapper.vm.$nextTick();
    expect(store.selectInstrument.codeInstrument).not.toBe(currentInstrument.codeInstrument)
  })
})