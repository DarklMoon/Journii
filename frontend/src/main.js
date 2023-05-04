import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router/routes.js'
import '@/index.css'

createApp(App).use(router).mount('#app')
