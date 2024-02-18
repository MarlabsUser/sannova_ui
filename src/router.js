import Login from './components/Login'
import UploadTemplate from './components/UploadTemplate'
import FormSelection from './components/FormSelection'
import Reconsiliation from './components/Reconsiliation'
import FormPrint from './components/FormPrint'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        component: Login,
      },
      {
        path: '/uploadTemplate',
        component: UploadTemplate,
      },
      {
        path: '/formSelection',
        component: FormSelection,
      },
      ,
      {
        path: '/reconsiliation',
        component: Reconsiliation,
      },
      {
        path: '/formPrint',
        component: FormPrint
      }
    ]
  })
export default router