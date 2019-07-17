import Vue from 'vue'
import App from './App'
import router from './router'
import './plugins/element.js'
import './assets/css/login.css'
import './assets/fonts/iconfont.css'
import './api/index.js'

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')