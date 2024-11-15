import { mount, shallowMount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia';
import { useInstrumentStore } from '../../stores/instrument.js';
import ChartComponent from '../../components/ChartComponent.vue'


describe('ChartComponent', () => {
  
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  
  test('Renderiza correctamente los datos del estado',  () => {
    const wrapper = mount(ChartComponent, {
      global: {
        plugins: [createPinia()],
      },
    })

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

  test('Se actualiza el rango al pinchar los botones', async () => {
    const shallowWrapper = shallowMount(ChartComponent, {
      global: {
        plugins: [createPinia()],
      },
    })

    shallowWrapper.find('#sixmonth-button').trigger('click');
    await shallowWrapper.vm.$nextTick();
    expect(shallowWrapper.vm.range).toBe('6M')
  })

  test('Se actualiza la información al cambiar el estado', async () => {
    const shallowWrapper = shallowMount(ChartComponent, {
      global: {
        plugins: [createPinia()],
      },
    })

    const store = useInstrumentStore()
    const currentInstrument = store.chartData.data.info.codeInstrument
    store.selectInstrument({ 
      codeInstrument: "BCI"
    })
    await shallowWrapper.vm.$nextTick();
    expect(shallowWrapper.vm.data.labels.length).toBeGreaterThan(0)
    expect(shallowWrapper.vm.chartData.info.codeInstrument).not.toBe(currentInstrument)
    expect(shallowWrapper.vm.chartData.info.codeInstrument).toBe("BCI") 
  })
})

