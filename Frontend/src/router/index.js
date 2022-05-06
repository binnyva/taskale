import { createRouter, createWebHashHistory } from 'vue-router'
// import firebase from 'firebase/app'
// import 'firebase/auth'
// import store from "../store"

import Home from '../views/Home.vue'
import Month from '../views/Month.vue'
// import Login from '../views/Login.vue'
// import Logout from '../views/Logout.vue'
import About from '../views/About.vue'

const routes = [
  {
    path: '/home',
    redirect: '/'
  },

  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },

  {
    path: '/month',
    name: 'Month',
    component: Month,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// Enable this for Auth
// router.beforeEach((to, from, next) => {
//   const loggedIn = store.getters.loggedIn
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

//   if (requiresAuth && !loggedIn) next('login');
//   else next();
// });

export default router
