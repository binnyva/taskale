<template>
  <div class="block-list border border-black p-2">
    <div class="task-list">
      <draggable :list="this.filteredTasks" item-key="id" :group="{ name: 'task-list', pull: 'clone', put: false }" :clone="onClone">
        <template #item="{ element }">
          <TaskBlock :task="element" class="task" view="intention"></TaskBlock>
        </template>
      </draggable>
    </div>
    <div class="level-list">
      <ul>
        <li v-for="levelKey in this.activeLevels" @click="this.showLevel = levelKey" :class="{ 'active': this.showLevel === levelKey }">
          {{this.store.levelNames[levelKey]}}
        </li>
      </ul>
    </div>
    <div class="new-task">
      <input v-if="this.isNewTaskShown" ref="newTaskField" type="text" v-model="newTaskName" placeholder="Task" @keyup.enter="saveNewTask" />
      <input v-if="!this.isNewTaskShown" type="button" value="+" @click="showNewTaskField" class="bg-blue-500 hover:bg-blue-700 text-white px-2 rounded" />
    </div>
  </div>
  <NewTask ref="newTask"></NewTask>
</template>

<script>
import { useStore } from '../store.js'
import draggable from "vuedraggable";
import TaskBlock from "./TaskBlock.vue"
import NewTask from "./NewTask.vue"

export default {
  name: "ProjectList",
  props: ["tasks", "level", "date"],
  components: {
    TaskBlock,
    draggable,
    NewTask
  },
  data() {
    console.log(this.tasks, this.level, this.date)
    return {
      showLevel: this.level,
      newTaskName: "",
      isNewTaskShown: false
    }
  },

  setup() {
    const store = useStore()
    return { store }
  },

  computed: {
    activeLevels: function() { 
      // :TODO: Order by store.levelOrder ?
      const levels = this.tasks.map( tsk => tsk.level ); // Get only the levels of tasks.
      let active = levels.filter( (value, index, self) => self.indexOf(value) === index ); // Return only unique levels
      active.unshift( 'all' )

      return active
    },
    filteredTasks: function() {
      return this.tasks.filter( value => value.level == this.showLevel || this.showLevel === 'all' )
    }
  },

  methods: {
    showNewTaskField() {
      this.isNewTaskShown = true;

      this.$nextTick(() => {
        this.$refs.newTaskField.focus()
      })
    },
    saveNewTask() {
      this.isNewTaskShown = false;
      this.store.addTask({ 
        name: this.newTaskName, 
        level: this.level,
        from: this.date + " 00:00:00"
      });
      this.newTaskName = "";
    },

    onClone( { id, name, hue } ) { // New element that's added to the Dropped array is created with this.
      // console.log(id,name)
      return {
        name: name,
        inserted: true,
        hue: (hue + 1 > 360) ? 1 : hue + 1,
        parentTaskId: id
      }
    }
  }
}
</script>

<style>
  .block-list {
    min-height: 5rem;
    display: grid;
    grid-template-columns: 80% auto;
    position: relative;
  }
  .level-list li {
    text-align: right;
  }
  .level-list li.active {
    font-weight: bold;
  }
  .new-task {
    position: absolute;
    bottom: 0.5rem;
    left: 1rem;
  }
</style>
