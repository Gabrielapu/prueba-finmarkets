import { mount, shallowMount } from '@vue/test-utils'
import { createPinia } from 'pinia';
import { useInstrumentStore } from '../stores/instrument.js';
import InstrumentListComponent from '../components/InstrumentListComponent.vue'
import SearchBarComponent from '../components/SearchBarComponent.vue'
import SummaryComponent from '../components/SummaryComponent.vue'
import ChartComponent from '../components/ChartComponent.vue';

describe('Integration', () => {
  let pinia;
  let store;

  beforeEach(() => {
    pinia = createPinia()
    store = useInstrumentStore(pinia)
  });

  test(
    'Al elegir un instrumento en la tabla, se actualiza SearchBarComponent y SummaryComponent', 
    async () => {
      const tableWrapper = mount(InstrumentListComponent, {
        props: {
          tablePlace: 'first'
        },
        global: { plugins: [pinia] },
      })
    
      const searchBarWrapper = mount(SearchBarComponent, {
        global: { plugins: [pinia] },
      })
    
      const summaryWrapper = mount(SummaryComponent, {
        global: { plugins: [pinia] },
      })

      const chartWrapper = shallowMount(ChartComponent, {
        global: { plugins: [pinia] },
      })
    
      // Estado inicial, tiene preseleccionado el instrumento 'AGUAS-A'
      expect(store.selectedInstrument.codeInstrument).toBe('AGUAS-A')

      // Se hace click en un elemento de la tabla
      tableWrapper.findAll('tr').at(4).trigger('click');
      await tableWrapper.vm.$nextTick();
      expect(store.selectedInstrument.codeInstrument).toBe('BSANTANDER')
      
      // Se verifica que SearchBarComponent se haya rendereado y actualizado
      expect(searchBarWrapper.html()).toContain('BSANTANDER')
      const input = searchBarWrapper.find('input');
      expect(input.attributes('placeholder')).toBe(store.selectedInstrument.codeInstrument)
      expect(searchBarWrapper.vm.selectedInstrument.codeInstrument).toBe('BSANTANDER')

      // Se verifica que el resumen se haya rendereado y actualizado
      const resume = store.resumeSelectedInstrument.data
      expect(summaryWrapper.vm.selectedInstrument.codeInstrument).toBe('BSANTANDER' )
      expect(summaryWrapper.html()).toContain(resume.price.openPrice.toString())

      // Se verifica que chartData se haya rendereado y actualizado
      expect(chartWrapper.vm.chartData.info.codeInstrument).toBe('BSANTANDER')
      expect(chartWrapper.findAll('button').length).toBe(4)
      expect(chartWrapper.html()).toContain('chart')
    }
  )
})