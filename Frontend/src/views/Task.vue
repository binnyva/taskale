<template>
  <div class="task-details">
  	<h2>{{ task.name }}</h2>

  </div>
</template>

<script>
import { useStore } from '../store.js'

export default {
  name: 'Task',
  props: ["taskId"],

  data() {
  	return {
  		task: {},
  		tree: {}, 
  			/* Tree format...
  			 *  {
			 *	  id: ,
			 *	  name: ,
			 *	  level: ,
			 *	  children: [ { ... task } ]
			 *	}
  			 */
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
  	  this.task = this.store.getTaskById( this.$route.params.taskId )

  	  // :TODO:
  	  // this.tree = this.store.getTree( this.$route.params.taskId )
  	}
  }

}

</script>

<style scoped>

</style>