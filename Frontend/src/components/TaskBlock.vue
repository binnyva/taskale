<template>
  <span @click="showTask" class="task-block" :class="view" ref="block" :style="{ 
      backgroundColor: `hsl(${task.hue}, 100%, 75%)`,
      border: `1px solid hsl(${task.hue}, 100%, 25%)`,
      color: `hsl(${task.hue}, 50%, 20%)`
    }">
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
    },

    showTask() {
      this.$router.push('/task/' + this.task.id)
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
  cursor: grabbing;
  border-radius: .25rem;
  padding: .1rem;
  margin: .25rem;
}
.day {
  display: inline-block;
  margin: 0;
}
</style>
 
