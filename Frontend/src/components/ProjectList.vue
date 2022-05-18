<template>
  <div class="block-list border border-black p-2">
    <draggable :list="tasks" item-key="id" :group="{ name: 'task-list', pull: 'clone', put: false }" :clone="onClone">
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
  name: "ProjectList",
  props: ["tasks", "level"],
  components: {
    TaskBlock,
    draggable
  },

  methods: {
    onClone( { id, name } ) { // New element that's added to the Dropped array is created with this.
      console.log(id,name)
      return {
        id: id + 20, // :TODO: 0, maybe.
        name: name,
        inserted: true,
        parent_task_id: id
      }
    }
  }
}
</script>

<style>
  .block-list {
    min-height: 5rem;
  }
</style>
