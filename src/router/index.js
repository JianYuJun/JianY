import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/login/index'
import Home from '../views/home/index'
import Welcome from '../views/home/welcome/index'
import Users from '../views/home/users/index'

Vue.use(Router)

const router = new Router({
        routes: [{
            path: '/',
            redirect: '/home'
        }, {
            path: '/login',
            component: Login
        }, {
            path: '/home',
            component: Home,
            redirect: '/welcome',
            children: [{
                path: '/welcome',
                component: Welcome
            }, {
                path: '/users',
                component: Users
            }]
        }]
    })
    // 如果没有登录就调整到登录页面
router.beforeEach((to, from, next) => {
        if (to.path === '/login') return next()
            // 获取token
        const token = sessionStorage.getItem('token')
            // 判断是否登录过   如果没有就跳转到登录页面
        if (!token) return next('/login')
            // 放行
        next()
    })
    // 暴露出去
export default router