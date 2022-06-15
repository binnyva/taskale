<template>
  <div ref="newTaskArea" class="new-task-area" v-show="isNewTaskShown" v-click-outside="hideNewTaskArea">
    <!-- <span class="relation-indicator">&gt;</span> -->
    <input type="text" v-model="newTaskName" class="new-task-name" placeholder="Task Name" @keyup.enter="saveNewTask" /><br />
    <input type="button" value="Save" @click="saveNewTask" class="bg-blue-500 hover:bg-blue-700 text-white px-2 rounded" />
  </div>
</template>

<script>
import { useStore } from '../store.js'

export default {
  name: 'NewTask',
  // props: ["onNewTask"]

  setup() {
    const store = useStore()
    return { store }
  },
  data() {
    return {
      isNewTaskShown: false,
      newTask: null,
      newTaskName: ""
    }
  },

  methods: {
  	addNewTask(task, level, details) {
      this.newTask = { 
        ...task,
        level: level,
        inserted: false
      };
      this.isNewTaskShown = true;

      this.$refs.newTaskArea.style.top = parseInt(details.pos.bottom - 3) + "px";
      this.$refs.newTaskArea.style.left = parseInt(details.pos.left) + "px";
      this.$refs.newTaskArea.style.width = details.cellWidth ? details.cellWidth + "px" : "200px";

      this.$nextTick(() => {
        this.$refs.newTaskArea.children[1].focus()
      })
    },

    saveNewTask() {
      this.isNewTaskShown = false;
      this.newTask.name = this.newTaskName;

      this.store.addTask(this.newTask);

      // :TODO: Call API to save this, update task.id

      this.newTask = null;
      this.newTaskName = "";
    },

    hideNewTaskArea() {
      this.isNewTaskShown = false;
    }
  }
}
</script>

<style scoped>
.new-task-area {
  position: absolute;
  border-radius: .25rem;
  border-right: 1px solid var(--border-color);
  border-left: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  background-color: var(--bg-sub-color);
  color:  var(--text-sub-color);
}

.new-task-area input.new-task-name:focus {
  border: 0;
  width: 95%;
  outline: none !important;
}
</style>