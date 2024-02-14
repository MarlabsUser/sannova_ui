import Login from './components/Login'
import Home from './components/Home'
import Test from './components/Test'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        component: Login,
      },
      {
        path: '/home',
        component: Home,
      },
      {
        path: '/test',
        component: Test,
      }
    ]
  })
export default router