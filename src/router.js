import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Vuetify from 'vuetify'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue);

Vue.use(Vuetify)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/games',
      name: 'games',
      component: () => import( './views/Games.vue')
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/standings',
      name: 'standings',
     
      component: () => import('./views/Standings.vue')
    },
    {
      path: '/teams',
      name: 'teams',
     
      component: () => import('./views/Teams.vue')
    },
    {
      path: '/chat',
      name: 'chat',
     
      component: () => import('./views/Chat.vue')
    }
  ]
})
