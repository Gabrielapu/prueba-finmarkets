import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia';
import { useInstrumentStore } from '../../stores/instrument.js';
import SearchBarComponent from '../../components/SearchBarComponent.vue'

describe('SearchBarComponent', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  const wrapper = mount(SearchBarComponent, {
    global: {
      plugins: [createPinia()],
    },
  })
  const store = useInstrumentStore()

  test('Renderiza correctamente los datos del estado', () => {
    const input = wrapper.find('input');
    expect(input.attributes('placeholder')).toBe(store.selectedInstrument.codeInstrument)
    expect(wrapper.vm.instrumentList.length).toBeGreaterThan(0)
  })

  test('El evento click en la lista desplegable selecciona un nuevo instrumento', async () => {
    const input = wrapper.find('input');
    input.trigger('focus');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.showDropdown).toBe(true)
    expect(wrapper.vm.instrumentList.length).toBeGreaterThan(0)

    wrapper.findAll('li').at(2).trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.selectedInstrument.codeInstrument).toBe('BCI')
    expect(input.attributes('placeholder')).toBe(store.selectedInstrument.codeInstrument)
    expect(wrapper.vm.showDropdown).toBe(false)
  })

  test('Responde a los cambios en el estado global reflejandose en la interfaz', async () => {
    store.selectInstrument({
      codeInstrument: "BSANTANDER"
    })
    await wrapper.vm.$nextTick();
    const input = wrapper.find('input');
    expect(input.attributes('placeholder')).toBe(store.selectedInstrument.codeInstrument)
  })

  test('El input contiene lo escrito por el usuario', async () => {
    const input = wrapper.find('input');
    await input.setValue('bci');
    expect(input.element.value).toBe('bci')

  })
})