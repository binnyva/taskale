<template>
  <div class="month">
    <div class="header">
      <h1 class="text-3xl font-bold">
        Month &gt; {{ header }}
      </h1>
    </div>

    <div class="content" ref="content">
      <BlockList :tasks="projects" :level="`month`"></BlockList>

      <CalendarMonth :date="date" :tasks="tasks" :onNewTask="onNewTask"></CalendarMonth>
    </div>
  </div>

  <div ref="newTaskArea" class="new-task-area" v-show="showNewTaskArea" v-click-outside="hideNewTaskArea">
    <span class="relation-indicator">&gt;</span>
    <input type="text" v-model="newTaskName" class="new-task-name" placeholder="Task Name" @keyup.enter="saveNewTask" /><br />
    <input type="button" value="Save" @click="saveNewTask" class="bg-blue-500 hover:bg-blue-700 text-white px-2 rounded" />
  </div>

</template>

<script>
import { useStore } from '../store.js'
import dayjs from "dayjs";
import BlockList from "../components/BlockList.vue"
import CalendarMonth from "../components/Calendar/CalendarMonth.vue"

export default {
  name: 'Month',
  components: {
    BlockList,
    CalendarMonth
  },
  setup() {
    const store = useStore()
    return { store }
  },
  data() {
    return {
      showNewTaskArea: false,
      newTask: null,
      newTaskName: "",
      date: this.$route.params.date ? this.$route.params.date : dayjs().format('YYYY-MM-DD'),
      // intentions: [{id: 1, name: "MindOS", level: "10year"}, {id: 2, name: "PKM Book", level: "year"}],
      // tasks: [{id: 3, name: "Write Outline", level: "day", from: "2022-05-04 00:00:00"}, {id: 4, name: "Create a mockup", from: "2022-05-04 00:00:00"}]
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
    updateDate: function() {
      this.date = this.$route.params.date
    },

    onNewTask: function(task, details) {
      this.newTask = { 
        ...task,
        id: task.id + 30, // :TODO: 
        level: "day",
        inserted: false
      };
      this.showNewTaskArea = true;
      this.$refs.newTaskArea.style.top = parseInt(details.pos.bottom - 3) + "px";
      this.$refs.newTaskArea.style.left = parseInt(details.pos.left) + "px";
      this.$refs.newTaskArea.style.width = ((this.$refs.content.clientWidth / 7) - 7) + "px";
      this.$nextTick(() => {
        this.$refs.newTaskArea.children[1].focus()
      })
    },

    saveNewTask: function() {
      this.showNewTaskArea = false;
      this.newTask.name = this.newTaskName;

      this.store.addTask(this.newTask);

      this.newTask = null;
      this.newTaskName = "";
    },

    hideNewTaskArea: function() {
      this.showNewTaskArea = false;
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