// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

// Import PrimeVue components you want to use globally
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Card from 'primevue/card'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Timeline from 'primevue/timeline';


// Import PrimeIcons
import 'primeicons/primeicons.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }: { app: any }) {
    // Install PrimeVue
    app.use(PrimeVue, {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.dark',
        }
      }
    })
    
    // Register components globally
    app.component('PrimeButton', Button)
    app.component('PrimeDataTable', DataTable)
    app.component('PrimeColumn', Column)
    app.component('PrimeCard', Card)
    app.component('PrimeDialog', Dialog)
    app.component('PrimeInputText', InputText)
    app.component('PrimeTimeline', Timeline)
  }
}
