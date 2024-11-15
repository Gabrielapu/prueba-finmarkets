import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia';
import { useInstrumentStore } from '../../stores/instrument.js';
import InstrumentListComponent from '../../components/InstrumentListComponent.vue'

describe('InstrumentListComponent', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  const wrapper = mount(InstrumentListComponent, {
    props: {
      tablePlace: 'first'
    },
    global: {
      plugins: [createPinia()],
    },
  })
  const store = useInstrumentStore()

  test('Renderiza correctamente los datos del estado usando una prop especifica',  () => {
    // Verifica que se haya renderizado la tabla
    expect(wrapper.findAll('table').length).toBeGreaterThan(0) 
    expect(wrapper.findAll('td').length).toBeGreaterThan(0)
    expect(wrapper.findAll('tr').length).toBeGreaterThan(0)
    expect(wrapper.findAll('th').length).toBeGreaterThan(0)
    
    // Verifica que existan los nombres de la primera mitad de los instrumentos
    store.instruments.slice(0, Math.ceil(store.instruments.length / 2)).forEach(i => {
      expect(wrapper.html()).toContain(i.name)
    })
  })
})