<template>
  <div class="year">
    <div class="header">
      <h1 class="text-3xl font-bold">
        Year &gt; 2022
      </h1>
    </div>

    <div class="content" ref="content">
      <ProjectList :tasks="projects" :level="`year`"></ProjectList>

      <CalendarYear date="2022-05-01" :tasks="tasks" :onNewTask="onNewTask"></CalendarYear>
    </div>
  </div>

  <div v-show="showSampleTaskEntryArea"><!--  v-click-outside="this.showSampleTaskEntryArea = false"> -->
    <Modal title="What do you want to do this year?" id="sample-tasks">
      <p class="text-white my-1">One task per line, please...</p>
      <textarea v-model="sampleTasks" rows="5" cols="50" class="my-0 w-full" placeholder="Tasks"></textarea>
      <button @click="saveSampleTasks()" class="bg-blue-500 hover:bg-blue-700 text-white rounded px-2 my-2">Save</button>
    </Modal>
  </div>

  <NewTask ref="newTask"></NewTask>

</template>

<script>
import { useStore } from '../store.js'
import ProjectList from "../components/ProjectList.vue"
import CalendarYear from "../components/Calendar/CalendarYear.vue"
import Modal from "../components/Modal.vue"
import NewTask from "../components/NewTask.vue"

export default {
  name: 'Year',
  components: {
    ProjectList,
    CalendarYear,
    Modal,
    NewTask
  },

  setup() {
    const store = useStore()
    return { store }
  },
  data() {
    return {
      showSampleTaskEntryArea: (this.store.getTotalTaskCount() === 0),
      sampleTasks: "Build a planning App\nTravel around the world",
    }
  },

  computed: {
    projects() { // Return only tasks at a higher or equal level of current level(year)
      return this.store.getFilteredTasks( task => (task.level === "year" || task.level === "10year") )
    },
    tasks() { // Return only tasks one level below current level(month)
      return this.store.getFilteredTasks( task => (task.level === "month"))
    }
  },
  methods: {
    onNewTask(task, details) {
      this.$refs.newTask.addNewTask(task, "month", { 
        ...details, 
        cellWidth: (this.$refs.content.clientWidth / 7) - 7 
      })
    },

    saveSampleTasks() {
      const sampleTasksLines = this.sampleTasks.split("\n");
      let tempTasks = [];
      for(let i = 0; i < sampleTasksLines.length; i++) {
        let id = i+20;
        tempTasks.push({
          id: id,
          name: sampleTasksLines[i].trim(),
          level: "year"
        })
      }

      this.store.setTasks( tempTasks );

      this.showSampleTaskEntryArea = false
    },

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