// https://pinia.vuejs.org/introduction.html#a-more-realistic-example
// :TODO

import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  persist: true,
  state: () => ({
    tasks: [],
    levelOrder: ['life', '10years', '5years', '3years', 'year', 'quarter', 'month', 'week', 'day'],
    levelNames: {
      'all'     : 'All',
      'life'    : 'Lifetime',
      '10years' : '10 Years',
      '5years'  : '5 Years',
      '3years'  : '3 Years',
      'year'    : 'Year',
      'quarter' : 'Quarter',
      'month'   : 'Month',
      'week'    : 'Week',
      'day'     : 'Day',
      'custom'  : 'Custom'
    }
  }),

  getters: { // Remember, all GETTERS RETURN A FUNCTION that will return the data.
    getTaskByIndex(state ) {
      return index => state[index];
    },
    getTaskById(state) {
      return id => state.tasks.find( task => task.id == id );
    },
    getAllTasks(state) {
      return () => state.tasks;
    },
    getFilteredTasks(state) {
      return callback => state.tasks.filter(callback);
    },
    getTotalTaskCount(state) {
      return () => state.tasks.length;
    }
  },
  actions: {
    setTasks(tks) {
      this.tasks = tks
    },

    addTask(task) {
      if(typeof task.hue === undefined) task.hue = Math.floor(Math.random() * 360);
      this.tasks.push(task)
    },

    updateTaskById(id, task) { // :TODO:

    }
  },
})
