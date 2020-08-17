import { defineComponent } from 'vue-demi'
import { shallowMount } from '@vue/test-utils'

export function renderHooks<V>(setup: () => V): any {
  const App = defineComponent({
    template: `<div ref="app" id="app"></div>`,
    setup,
  })

  return shallowMount(App as any)
}
