import { createRouter, createWebHistory } from 'vue-router'

// Components
import home from '../components/views/Home.vue'
import userSettings from '../components/views/UserSettings.vue'
import wishList from '../components/views/WishList.vue'
import shoppingCart from '../components/views/ShoppingCart.vue'
import login from '../components/auth/Login.vue'
import signup from '../components/auth/Signup.vue'

// Create a new router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      meta: { requiresAuth: true }
    },
    { 
      path: '/user-settings',
      name: 'userSettings',
      component: userSettings,
      meta: { requiresAuth: true }
    },
    { 
      path: '/wish-list', 
      name: 'wishList',
      component: wishList,
      meta: { requiresAuth: true }
    },
    { 
      path: '/shopping-cart', 
      name: 'shoppingCart',
      component: shoppingCart,
      meta: { requiresAuth: true }
    },
    { 
      path: '/login', 
      name: 'login',
      component: login
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup
    }
  ]
});

// Check if user is logged in
router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user');

  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router
