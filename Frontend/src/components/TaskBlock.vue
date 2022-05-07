<template>
  <span class="task-block" :class="view" ref="block">
    {{ task.name }}
  </span>
</template>

<script>
export default {
  name: 'TaskBlock',
  props: ["task", "view", "onNewTask"],
  methods: {
    sendPosition() {
      this.onNewTask(this.task, {
        pos: this.$refs.block.getBoundingClientRect()
      })
    }
  },
  mounted() {
    if(this.task.inserted) {
      this.sendPosition()
    }
  }
}
</script>

<style>
.task-block {
  border-radius: .25rem;
  padding: .1rem;
  margin: .25rem;
  border: 1px solid var(--border-color);
  background-color: var(--bg-sub-color);
  color:  var(--text-sub-color);
}
.day {
  display: inline-block;
  margin: 0;
}
.intention {
  
}
</style>
 
