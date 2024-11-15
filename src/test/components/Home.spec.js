import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia';
import { useInstrumentStore } from '../../stores/instrument.js';
import Home from '../../views/Home.vue'

describe('Home', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  const wrapper = mount(Home, {
    global: {
      plugins: [createPinia()],
    },
  })
  const store = useInstrumentStore()

  test('Responde a los cambios en el estado global reflejandose en la interfaz', async () => {
    console.log(wrapper.html())
  })
})