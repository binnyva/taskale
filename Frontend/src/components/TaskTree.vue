<template>
  <li>
    <TaskBlock v-if="this.tree.id != this.highlightTaskId" :task="this.tree" view="tree"></TaskBlock>
    <div v-if="this.tree.id == this.highlightTaskId" class="highlighted-task">
      <TaskBlock :task="this.tree" view="tree"></TaskBlock>
      <p v-if="this.tree.description">{{this.tree.description}}</p>
    </div>
    <ul class="children">
      <TaskTree v-for="child in tree.children" :tree="child" :highlightTaskId="highlightTaskId"></TaskTree>
    </ul>
  </li>
</template>

<script>
import TaskBlock from "./TaskBlock.vue"

export default {
  name: 'TaskTree',
  props: ["tree", "highlightTaskId"],
  components: { TaskBlock },

  // created() {
  //   console.log("Created", this.highlightTaskId, this.tree.id)
  // }
}

</script>

<style scoped>
.children {
  list-style-type: disc;
  margin-left: 1.25rem;
  margin-top: .25rem;
}
.highlighted-task span {
  font-weight: bold;
}
</style>