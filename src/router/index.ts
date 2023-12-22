import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/Pages/HomePage.vue'
import HomeTabTimes from "@/views/Components/HomeTabTimes.vue";
import HomeTabSettings from "@/views/Components/HomeTabSettings.vue";

const routes = [
  {
    path: '/',
    component: HomePage,
    children: [
      {
        path: '',
        redirect: 'vakitler',
      },
      {
        path: 'vakitler',
        component: HomeTabTimes,
      },
      {
        path: 'ayarlar',
        component: HomeTabSettings,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
