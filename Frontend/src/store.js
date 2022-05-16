// https://pinia.vuejs.org/introduction.html#a-more-realistic-example
// :TODO

import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => ({
    tasks: [
      {id: 1, name: "MindOS", level: "10year"}, 
      {id: 2, name: "PKM Book", level: "year"},
      {id: 3, name: "Write Outline", level: "day", from: "2022-05-01 00:00:00"}, 
      {id: 4, name: "Create a mockup", level: "day", from: "2022-06-01 00:00:00"}
    ],
  }),

  getters: {
    getTaskByIndex(state ) {
      return index => state[index];
    },
    getTaskById(state) {
      return id => state.tasks.find( task => task.id == id );
    },
    getAllTasks(state) {
      return state.tasks;
    },
    getFilteredTasks(state) {
      return callback => state.tasks.filter(callback);
    },
  },
  actions: {
    setTasks(tks) {
      this.tasks = tks
    },

    addTask(task) {
      this.tasks.push(task)
    },

    updateTaskById(id, task) {

    }
  },
})
