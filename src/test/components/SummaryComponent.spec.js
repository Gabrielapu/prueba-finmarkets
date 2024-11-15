import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia';
import { useInstrumentStore } from '../../stores/instrument.js';
import SummaryComponent from '../../components/SummaryComponent.vue'

describe('SummaryComponent', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  const wrapper = mount(SummaryComponent, {
    global: {
      plugins: [createPinia()],
    },
  })
  const store = useInstrumentStore()

  test('Renderiza correctamente los datos del estado',  () => {
    const resume = store.resumeSelectedInstrument.data
    expect(wrapper.html()).toContain(store.selectedInstrument.datetimeLastPrice)
    expect(wrapper.html()).toContain(resume.price.openPrice.toString())
    expect(wrapper.html()).toContain(resume.price.maxDay.toString())
  })

  test('Responde a los cambios en el estado global reflejandose en la interfaz', async () => {
    store.selectInstrument({ 
      codeInstrument: "BSANTANDER"
    })
    await wrapper.vm.$nextTick();
    const resume = store.resumeSelectedInstrument.data
    expect(wrapper.html()).toContain('Bolsa de Santiago')
    expect(wrapper.html()).toContain(resume.price.openPrice.toString())
    expect(wrapper.html()).toContain(resume.price.maxDay.toString())
  })
})