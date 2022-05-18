<template>
  <div class="intention-area">
    <TaskBlock v-for="(intent, index) in intentions" :key="index" :task="intent"></TaskBlock>
  </div>
</template>

<script>
import TaskBlock from "./TaskBlock"

export default {
  name: 'IntentionArea',
  props: ["intentions", "level"],
  components: {
    TaskBlock,
  }
}
</script>

<style>
</style>
 
