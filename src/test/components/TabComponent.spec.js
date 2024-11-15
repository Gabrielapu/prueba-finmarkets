import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia';
import { useInstrumentStore } from '../../stores/instrument.js';
import TabComponent from '../../components/TabComponent.vue'

describe('TabComponent', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  const wrapper = mount(TabComponent, {
    global: {
      plugins: [createPinia()],
    },
  })
  const store = useInstrumentStore()

  test('El primer tab muestra las tablas', async () => {
    wrapper.findAll('li').at(0).trigger('click')
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('tr').length).toBeGreaterThan(0)
    expect(wrapper.findAll('td').length).toBeGreaterThan(0)
  })

  test('Los demás tabs muestran un mensaje de que no estan los datos', async () => {
    const wrapper = mount(TabComponent)
    wrapper.findAll('li').at(2).trigger('click')
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toContain('Tab sin registros segun JSON de prueba')

  })

})