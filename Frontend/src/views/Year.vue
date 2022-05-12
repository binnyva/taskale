<template>
  <div class="year">
    <div class="header">
      <h1 class="text-3xl font-bold">
        Year &gt; 2022
      </h1>
    </div>

    <div class="content" ref="content">
      <BlockList :tasks="intentions" :level="`year`"></BlockList>

      <CalendarYear date="2022-05-01" :tasks="tasks" :onNewTask="onNewTask"></CalendarYear>
    </div>
  </div>

  <div ref="newTaskArea" class="new-task-area" v-show="showNewTaskArea" v-click-outside="hideNewTaskArea">
    <span class="relation-indicator">&gt;</span>
    <input type="text" v-model="newTaskName" class="new-task-name" placeholder="Task Name" @keyup.enter="saveNewTask" /><br />
    <input type="button" value="Save" @click="saveNewTask" class="bg-blue-500 hover:bg-blue-700 text-white px-2 rounded" />
  </div>

</template>

<script>
import BlockList from "../components/BlockList.vue"
import CalendarYear from "../components/Calendar/CalendarYear.vue"

export default {
  name: 'Year',
  components: {
    BlockList,
    CalendarYear
  },
  data() {
    return {
      showNewTaskArea: false,
      newTask: null,
      newTaskName: "",
      intentions: [{id: 1, name: "MindOS", level: "10year"}, {id: 2, name: "PKM Book", level: "year"}],
      tasks: [{id: 3, name: "Write Outline", level: "day", from: "2022-05-01 00:00:00"}, {id: 4, name: "Create a mockup", from: "2022-06-01 00:00:00"}]
    }
  },
  methods: {
    onNewTask: function(task, details) {
      this.newTask = { ...task };// Clone the object. Or even the task in the intention block will get updated.
      this.showNewTaskArea = true;
      this.$refs.newTaskArea.style.top = parseInt(details.pos.bottom - 4) + "px";
      this.$refs.newTaskArea.style.left = parseInt(details.pos.left) + "px";
      this.$refs.newTaskArea.style.width = ((this.$refs.content.clientWidth / 7) - 7) + "px";
      this.$nextTick(() => {
        this.$refs.newTaskArea.children[1].focus()
      })
    },

    saveNewTask: function() {
      this.showNewTaskArea = false;
      this.newTask.name = this.newTaskName;
      this.tasks.push(this.newTask);

      this.newTask = null;
      this.newTaskName = "";
    },

    hideNewTaskArea: function() {
      this.showNewTaskArea = false;
    },

    getIndexOfTaskId(taskId) {
      for(let i=0; i < this.tasks.length; i++) {
          let task = this.tasks[i];

          if(task.id == taskId) {
            return i;
          }
      }

      return null;
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