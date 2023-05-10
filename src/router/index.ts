import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'

enum Views {
  Home = 'Home',
  Error = 'Error',
  Products = 'Products',
  Product = 'Product'
}

enum Layouts {
  ProductLayout = 'ProductLayout'
}

const loadView = (view: keyof typeof Views) => () => import(`@/views/${view}.vue`)
const loadLayout = (layout: keyof typeof Layouts) => () => import(`@/layouts/${layout}.vue`)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/products',
    component: loadLayout(Layouts.ProductLayout),
    children: [
      {
        path: '',
        name: 'products',
        component: loadView(Views.Products),
        meta: {
          title: 'Products'
        }
      },
      {
        path: 'posters',
        name: 'posters',
        component: loadView(Views.Product),
        meta: {
          title: 'Posters'
        }
      },
      {
        path: 'flyers',
        name: 'flyers',
        component: loadView(Views.Product),
        meta: {
          title: 'Flyers'
        }
      },
      {
        path: 'business-cards',
        name: 'business-cards',
        component: loadView(Views.Product),
        meta: {
          title: 'Business cards'
        }
      }
    ]
  },
  // 404
  {
    path: '/:pathMatch(.*)*',
    redirect: 'error'
  },
  {
    path: '/error',
    name: 'error',
    component: loadView(Views.Error)
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
