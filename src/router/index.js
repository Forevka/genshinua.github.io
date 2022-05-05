import { createRouter, createWebHistory } from 'vue-router'
import Home from '/src/components/Home.vue'
import About from '/src/components/About.vue'
import Article from '/src/components/Article.vue'
import Menu from '/src/components/Menu/Menu.vue'
import NewsView from '/src/views/News.vue'
import MainView from '/src/views/Main.vue'

const routes = [
    {
        path: '/',
        name: 'Main',
        component: MainView,
    },
    {
        path: '/about',
        name: 'About',
        component: About,
    },
    {
        path: '/news',
        name: 'News',
        component: NewsView,
    },
    {
        path: '/article/:id',
        name: 'Article',
        component: Article,
    },
    {
        path: '/menu',
        name: 'Menu',
        component: Menu,
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
