<template>
  <li
    class="calendar-unit"
    :class="[
      unitClass,
      isCurrentUnit ? 'calendar-current-unit' : ''
    ]"
  >
    <span><router-link :to="{ path: `/month/${this.date}` }">{{ label }}</router-link></span>

    <div class="unit-tasks" :key="updateKey">
      <draggable :list="tasks" item-key="id" group="task-list" @change="log"><!-- :TODO: This should be 100% with and height. Otherwise drop is not easy -->
        <template #item="{ element }">
          <TaskBlock :task="element" class="task" :view="unit" :onNewTask="onNewTask"></TaskBlock>
        </template>
      </draggable>
    </div>
  </li>
</template>

<script>
import dayjs from "dayjs";
import TaskBlock from "../TaskBlock.vue";
import draggable from "vuedraggable";

export default {
  name: "CalendarUnit",
  components: { 
    TaskBlock,
    draggable 
  },
  props: ["date", "unit", "label", "unitKey", "isCurrentUnit", "tasks", "onNewTask"],
  data() {
    return {
      updateKey: 0, // This is for UI Update
      unitClass: `unit-${this.unit}`
    }
  },

  methods: {
    saveChanges() {

    },
    log(evt) {
      if(evt.added) {
        const taskId = evt.added.element.id
        for(let i=0; i < this.tasks.length; i++) {
          if(this.tasks[i].id == taskId) {
            this.tasks[i].from = dayjs(this.date).format('YYYY-') + this.unitKey + "-01 00:00:00";
            this.tasks[i].inserted = true;
            break;
          }
        }

        this.updateKey += 1; // Force rerender
      }
    }
  }
};
</script>

<style scoped>
.calendar-unit {
  position: relative;
  min-height: 100px;
  font-size: 16px;
  background-color: #fff;
  color: var(--grey-800);
  padding: 5px;
}

.calendar-unit > span {
  display: flex;
  justify-content: left;
  align-items: left;
  position: absolute;
  bottom: 0;
}

.calendar-current-unit {
  padding-top: 4px;
}

.calendar-current-unit > span {
  color: #fff;
  padding: 0 3px;
  border-radius: 3px;
  background-color: var(--grey-800);
}
</style>
