import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia';
import { useInstrumentStore } from '../../stores/instrument.js';
import ChartComponent from '../../components/ChartComponent.vue'


describe('ChartComponent', () => {
  
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  const wrapper = mount(ChartComponent, {
    global: {
      plugins: [createPinia()],
    },
  })
  const store = useInstrumentStore()

  test('Renderiza correctamente los datos del estado',  () => {
    const canvas = wrapper.find('canvas');
    const labelsLength = wrapper.vm.data.labels.length
    const dataLength = wrapper.vm.data.datasets[0].data.length
    const oneMonthBtn = wrapper.find('#onemonth-button')
    const threeMonthBtn = wrapper.find('#threemonth-button')
    const sixMonthBtn = wrapper.find('#sixmonth-button')
    const oneYearBtn = wrapper.find('#oneyear-button')

    expect(labelsLength).toBeGreaterThan(0)
    expect(dataLength).toBeGreaterThan(0)
    expect(canvas.exists()).toBe(true)
    expect(oneMonthBtn.exists()).toBe(true)
    expect(threeMonthBtn.exists()).toBe(true)
    expect(sixMonthBtn.exists()).toBe(true)
    expect(oneYearBtn.exists()).toBe(true)
  })
})

