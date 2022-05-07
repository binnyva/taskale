<template>
  <li
    class="calendar-day"
    :class="{
      'calendar-day--not-current': !day.isCurrentMonth,
      'calendar-day--today': isToday
    }"
  >
    <span>{{ label }}</span>

    <div class="day-tasks" :key="dayKey">
      <draggable :list="tasks" item-key="id" group="task-list" @change="log"><!-- :TODO: This should be 100% with and height. Otherwise drop is not easy -->
        <template #item="{ element }">
          <TaskBlock :task="element" class="task" view="day" :onNewTask="onNewTask"></TaskBlock>
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
  name: "CalendarMonthDayItem",
  components: { 
    TaskBlock,
    draggable 
  },
  props: ["day", "isCurrentMonth", "isToday", "tasks", "onNewTask"],
  data() {
    return {
      dayKey: 0
    }
  },

  computed: {
    label() {
      return dayjs(this.day.date).format("D");
    }
  },
  methods: {
    saveChanges() {

    },
    log(evt) {
      if(evt.added) {
        const taskId = evt.added.element.id
        for(let i=0; i < this.tasks.length; i++) {
          let task = this.tasks[i];

          if(task.id == taskId) {
            this.tasks[i].from = dayjs(this.day.date).format("YYYY-MM-DD 00:00:00");
            this.tasks[i].inserted = true;
            break;
          }
        }

        this.dayKey += 1; // Force rerender
      }
    }
  }
};
</script>

<style scoped>
.calendar-day {
  position: relative;
  min-height: 100px;
  font-size: 16px;
  background-color: #fff;
  color: var(--grey-800);
  padding: 5px;
}

.calendar-day > span {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 2px;
  width: var(--day-label-size);
  height: var(--day-label-size);
}

.calendar-day--not-current {
  background-color: var(--grey-100);
  color: var(--grey-300);
}

.calendar-day--today {
  padding-top: 4px;
}

.calendar-day--today > span {
  color: #fff;
  border-radius: 9999px;
  background-color: var(--grey-800);
}
</style>
