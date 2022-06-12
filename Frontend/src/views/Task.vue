<template>
  <div class="task-details">
    <ul class="my-8">
      <TaskTree :tree="this.tree" :highlightTaskId="this.$route.params.taskId"></TaskTree>
    </ul>
    
  </div>
</template>

<script>
import { useStore } from '../store.js'
import TaskTree from "../components/TaskTree.vue"
import Tree from "../utils/tree.js"
import { markRaw } from 'vue'

export default {
  name: 'Task',
  props: ["taskId"],
  components: { TaskTree },

  data() {
  	return {
  		task: {},
  		tree: {},
      hierarchy: {}
  	}
  },

  setup() {
    const store = useStore()
    return { store }
  },

  created() {
    this.$watch( // Param change will not update date by default
      () => this.$route.params,
      () => { this.getTask() },
      { immediate: true }
    )
  },

  methods: {
  	getTask() {
  	  // this.task = this.store.getTaskById( this.$route.params.taskId )
  	  this.tree = markRaw( this.store.getTaskTree( this.$route.params.taskId ) )
      // this.hierarchy = markRaw( this.store.getHierarchy( this.$route.params.taskId ) )
  	},
  }
}

</script>

<style scoped>

</style>