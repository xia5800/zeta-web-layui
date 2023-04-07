import { createApp } from 'vue'
import App from './App.vue'
import { setupStore } from './store'
import { setupRouter } from './router'
import { setupGlobalDirectives } from './directives'

import './styles/index.css'

const app = createApp(App)
// 配置store
setupStore(app)
// 配置router
setupRouter(app)
// 配置全局指令
setupGlobalDirectives(app)
app.mount('#app')
