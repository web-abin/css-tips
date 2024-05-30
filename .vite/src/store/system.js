import { defineStore } from 'pinia';

export const useSystemStore = defineStore('system', {
  state: () => ({
    name: 'Alice',
  }),
});
