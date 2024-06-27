import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import focus from '@/directives/focus'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(focus)
app.use(createPinia())
app.use(router)

app.mount('#app')
