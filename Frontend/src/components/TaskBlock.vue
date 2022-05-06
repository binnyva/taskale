<template>
  <span class="task-block" :class="view" ref="block">
    {{ task.name }}
  </span>
</template>

<script>
export default {
  name: 'TaskBlock',
  props: ["task", "view", "newTaskDetails"],
  methods: {
    sendPosition() {
      this.newTaskDetails(this.task, {
        left: this.$refs.block.getBoundingClientRect().left, 
        top: this.$refs.block.getBoundingClientRect().top
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
 
