import { createApp } from 'vue'
import router from '@/router/index.js'
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import './style.css'
import '@/assets/style/theme.css'
import App from './App.vue'

const pinia = createPinia();
pinia.use(
  createPersistedState({
    storage: {
      getItem: (key) => localStorage.getItem(key),
      setItem: (key, value) => {
        if (key === 'user') {
          localStorage.setItem(key, value);
        }
        localStorage.setItem(key, value);
      },
      removeItem: (key) => localStorage.removeItem(key),
    },
  })
);

createApp(App).use(router).use(pinia).mount('#app')
