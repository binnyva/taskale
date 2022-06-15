import { defineStore } from 'pinia'
import { cloneDeep } from 'lodash-es'
import { v4 as uuid } from 'uuid';

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
    },

    /* Tree format...
     *  {
     *    id: ,
     *    name: ,
     *    level: ,
     *    ...
     *    children: [ { ... task } ]
     *  }
     * There is a lot of cloneDeep all over the place because otherwise vue will make the data reactive by adding 'proxy' and 'target' - messing up the data structure.
     */

    getHierarchy(state) {
      return ( id ) => {
        return [
          this.getAllParents( id ),
          this.getTaskById( id ),
          this.getAllChildren( id )
        ]
      }
    },
    getTaskTree(state) {
      return ( id ) => {
        let children = this.getAllChildren( id )
        let tree = this.getAllParents( id, children ) // Current task is included in this.

        return tree;
      }
    },

    // Get the immediate parent of the given task.
    getParent(state) {
      return ( id ) => {
        const task = this.getTaskById ( id )
        return task.parentTaskId ? this.getTaskById( task.parentTaskId ) : null
      }
    },
    // Get all parents/anestors of the given task - all the way to the root task.
    getAllParents(state) {
      return ( id, children ) => {
        let child = cloneDeep( this.getTaskById ( id ) )
        if(!child) return {};
        if(children) child.children = children

        let parent = {};
        while( child?.parentTaskId ) { // See if it has a parent
          parent = cloneDeep( this.getParent( child.id ) ) // If yes, get the parent
          parent.children = [ child ] // Set the current node as the child of the found parent.

          child = { ...parent } // Then(this is the clever part), make the parent the child/current search node. 
                                // Because its a while loop, it will continue this till we reach root.
        }

        return cloneDeep(parent);
      }
    },

    // Get the immediate children of the given task.
    getChildren(state) {
      return ( id ) => {
        return cloneDeep( state.tasks.filter( task => task?.parentTaskId == id ) )
      }
    },

    // Get all the children and descendants of the given task.
    getAllChildren( state ) {
      return ( id ) => {
        let children = cloneDeep( this.getChildren( id ) )

        for(let i = 0; i < children.length; i++) {
          children[i].children = this.getAllChildren( children[i].id ) // :RECURSION:
        }

        return cloneDeep( children )
      }
    },

  },
  actions: {
    setTasks(tks) {
      this.tasks = tks
    },

    addTask(task) {
      if(typeof task.hue == "undefined") task.hue = Math.floor(Math.random() * 360);
      if(typeof task.id == "undefined") task.id = uuid();

      this.tasks.push(task)
    },

    updateTaskById(id, task) { // :TODO:

    }
  },
})
