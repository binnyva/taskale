<template>
  <div class="month">
    <div class="header">
      <h1 class="text-3xl font-bold">
        Month &gt; {{ header }}
      </h1>
    </div>

    <div class="content" ref="content">
      <ProjectList :tasks="projects" :level="`month`"></ProjectList>

      <CalendarMonth :date="date" :tasks="tasks" :onNewTask="onNewTask"></CalendarMonth>
    </div>
  </div>

  <NewTask ref="newTask"></NewTask>

</template>

<script>
import { useStore } from '../store.js'
import dayjs from "dayjs";
import ProjectList from "../components/ProjectList.vue"
import CalendarMonth from "../components/Calendar/CalendarMonth.vue"
import NewTask from "../components/NewTask.vue"

export default {
  name: 'Month',
  components: {
    ProjectList,
    CalendarMonth,
    NewTask
  },
  setup() {
    const store = useStore()
    return { store }
  },
  data() {
    return {
      date: this.$route.params.date ? this.$route.params.date : dayjs().format('YYYY-MM-DD'),
    }
  },

  created() {
    this.$watch( // Param change will not update date by default
      () => this.$route.params,
      () => { this.updateDate() },
      { immediate: true }
    )
  },

  computed: {
    header() {
      return dayjs(this.date).format('MMMM, YYYY')
    },

    projects() {
      return this.store.getFilteredTasks( task => (task.level === "year" || task.level === "month") )
    },
    tasks() {
      return this.store.getFilteredTasks( task => (task.level === "day"))
    }
  },

  methods: {
    updateDate() {
      this.date = this.$route.params.date
    },

    onNewTask(task, details) {
      this.$refs.newTask.addNewTask(task, "day", { 
        ...details, 
        cellWidth: (this.$refs.content.clientWidth / 7) - 7 
      })
    },
  }
}
</script>

<style scoped>

</style>