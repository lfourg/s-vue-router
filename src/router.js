import Vue from 'vue'
import SRouter from './s-router'

Vue.use(SRouter)

export default new SRouter({
    routes: [
        {
            name: 'index',
            path: '/',
            component: () => import('./views/index'),
            beforeEnter(from, to, next) {
                //处理异步请求
                setTimeout(()=>{
                    next()
                })
            }
        }, {
            name: 'about',
            path: '/about',
            component: () => import('./views/about')
        }
    ]
})