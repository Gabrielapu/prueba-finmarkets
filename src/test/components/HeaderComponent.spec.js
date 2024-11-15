import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia';
import { useInstrumentStore } from '../../stores/instrument.js';
import HeaderComponent from '../../components/HeaderComponent.vue'

describe('HeaderComponent', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  const wrapper = mount(HeaderComponent, {
    global: {
      plugins: [createPinia()],
    },
  })
  const store = useInstrumentStore()

  test('Renderiza correctamente los datos del estado', () => {
    expect(wrapper.html()).toContain(store.selectedInstrument.name)
    expect(wrapper.html()).toContain(store.selectedInstrument.lastPrice.toString())
    expect(wrapper.html()).toContain(store.selectedInstrument.performanceRelative.toString())
    expect(wrapper.html()).toContain(store.selectedInstrument.performanceAbsolute.toString())
  })

  test('Responde a los cambios en el estado global reflejandose en la interfaz', async () => {
    store.selectInstrument({ 
      codeInstrument: "BSANTANDER",
      name: "BANCO SANTANDER CHILE",
      shortName: "BSANTANDER",
      pctDay: -0.212269,
      pct30D: 3.402107111501307,
      pctCY: 9.558139534883715,
      pct1Y: 16.063069721606293,
      lastPrice: 47.01,
      datetimeLastPrice: "06-11-2024 12:15:24",
      volumeMoney: 288200,
      accumulatedVolumeMoney: 1015453989,
      tend: "down",
      performanceAbsolute: -0.10000000000000142,
      performanceRelative: -0.212269
    })
    await wrapper.vm.$nextTick();
    
    expect(wrapper.html()).toContain('BANCO SANTANDER CHILE')
    expect(wrapper.html()).toContain('47.01')
    expect(wrapper.html()).toContain('-0.212269'.substring(0, 4))
    expect(wrapper.html()).toContain('-0.10000000000000142'.substring(0, 4))
  })
})