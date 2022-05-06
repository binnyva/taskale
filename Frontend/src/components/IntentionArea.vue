<template>
  <div class="intention-area">
    <TaskBlock v-for="(intent, index) in intentions" :key="index" :task="intent"></TaskBlock>
  </div>
</template>

<script>
// import draggable from 'vuedraggable'
import TaskBlock from "./TaskBlock"

export default {
  name: 'IntentionArea',
  props: ["intentions", "level"],
  components: {
    TaskBlock,
    // draggable
  },
  data: () => {
    return {
      activeLevel: "month"
    }
  },
  methods: {
  }
}
</script>

<style>
</style>
 
