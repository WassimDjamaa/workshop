import { createRouter, createWebHistory } from 'vue-router'

// Components
import Home from '../components/Home.vue'
import userSettings from '../components/userSettings.vue'
import wishList from '../components/wishList.vue'
import shoppingCart from '../components/shoppingCart.vue'

// Create a new router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    { 
      path: '/user-settings', 
      component: userSettings, 
      name: 'userSettings' 
    },
    { 
      path: '/wish-list', 
      component: wishList, 
      name: 'wishList' 
    },
    { 
      path: '/shopping-cart', 
      component: shoppingCart, 
      name: 'shoppingCart' 
    },
  ]
})

export default router
