import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export const store = new Vuex.Store({
    state: {
      tasks:[],
    },
    mutations: {
      set_tasks (state,payload) {
        state.tasks = payload;
      },
      add_task (state,payload) {
        state.tasks.push(payload);
      },
      delete_task (state,payload) {
        const index = state.tasks.findIndex((task) => task.task_id === payload);
        state.tasks.splice(index, 1);
      },

    }
})
export default store