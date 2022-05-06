<template>
  <div class="block-list border border-black p-2">
    <draggable :list="tasks" item-key="id" :group="{ name: 'task-list', pull: 'clone', put: false }">
      <template #item="{ element }">
        <TaskBlock :task="element" class="task" view="intention"></TaskBlock>
      </template>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import TaskBlock from "./TaskBlock.vue"

export default {
  name: "BlockList",
  props: ["tasks", "level"],
  components: {
    TaskBlock,
    draggable
  },
  data: () => {
    return {
      activeLevel: "month"
    }
  }
}
</script>

<style>
  .block-list {
    min-height: 5rem;
  }
</style>
