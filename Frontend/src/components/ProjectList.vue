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
  </div>
</template>

<script>
import { useStore } from '../store.js'
import draggable from "vuedraggable";
import TaskBlock from "./TaskBlock.vue"

export default {
  name: "ProjectList",
  props: ["tasks", "level"],
  components: {
    TaskBlock,
    draggable
  },
  data() {
    return {
      showLevel: this.level
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
    onClone( { id, name, hue } ) { // New element that's added to the Dropped array is created with this.
      // console.log(id,name)
      return {
        id: id + 20, // :TODO: 0, maybe.
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
  }
  .level-list li {
    text-align: right;
  }
  .level-list li.active {
    font-weight: bold;
  }
</style>
