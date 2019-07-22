import Vue from 'vue'
import App from './App'
import router from './router'
import './plugins/element.js'
import './assets/css/login.css'
import './assets/fonts/iconfont.css'
import './api/index.js'
import TreeTable from 'vue-table-with-tree-grid'


Vue.config.productionTip = false
Vue.component('tree-table', TreeTable)

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')