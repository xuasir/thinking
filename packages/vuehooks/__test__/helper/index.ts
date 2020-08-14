import { defineComponent } from 'vue'
import { shallowMount } from '@vue/test-utils'

export function renderHooks<V>(setup: () => V): any {
  const App = defineComponent({
    template: `<div ref="app" id="app"></div>`,
    setup,
  })

  return shallowMount<V>(App as any)
}
