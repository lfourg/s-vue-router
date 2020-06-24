let Vue

class SRouter {
    static install(_vue) {
        Vue = _vue
        Vue.mixin({
            beforeCreate() {
                if (this.$options.router) {
                    Vue.prototype.$srouter = this.$options.router
                    this.$options.router.init()
                }
            }
        })
    }

    constructor(opitons) {
        this.$options = opitons
        this.routeMap = {}
        this.app = new Vue({
            data: {
                current: '/'
            }
        })
    }

    //路由初始化函数
    init() {
        //启动路由
        // 1.监听hashchange事件
        this.handleEvents()
        //2.处理路由
        this.createRouterMap()
        //3.初始化组件router-link router-view
        this.initComponent()
        //4.处理钩子函数
    }

    //注册监听事件
    handleEvents() {
        window.addEventListener('hashchange', this.onHashChange.bind(this), false)
        window.addEventListener('load', this.onHashChange.bind(this), false)
    }

    //监听hash改变
    onHashChange(e) {
        //路由跳转
        let hash = window.location.hash.slice(1) || '/'
        let router = this.routeMap[hash]
        if (router && router.beforeEnter) {
            let [from, to] = [e.oldURL?.split('#')[1], e.newURL?.split('#')[1] || '/']
            router.beforeEnter(from, to, () => {
                this.app.current = hash
            })
        } else {
            this.app.current = hash
        }
    }

    //routers数组转换成Map，方便后面取值
    createRouterMap() {
        this.$options.routes.forEach(item => {
            this.routeMap[item.path] = item
        })
    }

    //提供push函数，路由跳转
    push(_hash) {
        window.location.hash = _hash || '/'
    }

    //初始化组件 router-view router-link
    initComponent() {
        Vue.component('router-view', {
            render: h => {
                const component = this.routeMap[this.app.current].component
                //使用h新建一个虚拟dom
                return h(component)
            }
        })
        Vue.component('router-link', {
            props: {
                to: String
            },
            render(h) {
                return h('a', {
                        attrs: {
                            href: '#' + this.to
                        }
                    },
                    [this.$slots.default]
                )
            }
        })
    }
}

export default SRouter