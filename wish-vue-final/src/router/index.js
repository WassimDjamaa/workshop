import { createRouter, createWebHistory } from 'vue-router'

// Components
import home from '../components/views/Home.vue'
import userSettings from '../components/views/UserSettings.vue'
import wishList from '../components/views/WishList.vue'
import shoppingCart from '../components/views/ShoppingCart.vue'
import login from '../components/auth/Login.vue'
import register from '../components/auth/Register.vue'

// Create a new router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
    },
    { 
      path: '/user-settings',
      name: 'userSettings',
      component: userSettings
    },
    { 
      path: '/wish-list', 
      name: 'wishList',
      component: wishList
    },
    { 
      path: '/shopping-cart', 
      name: 'shoppingCart',
      component: shoppingCart
    },
    { 
      path: '/login', 
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    }
  ]
});

export default router
