import './assets/main.css'

import { createApp } from 'vue'
import {createRouter, createWebHistory } from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'

const app = createApp(App)

const routes = [
    {path: '/', name: 'home', component: () => import('@/pages/Home.vue')},
    {path: '/favorites',name: 'favorites',  component: () => import('@/pages/Favorites.vue') },
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
app.use(router)
app.use(autoAnimatePlugin)
app.mount('#app')