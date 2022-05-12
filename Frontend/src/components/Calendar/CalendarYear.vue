<template>
  <!-- Parent container for the calendar month -->
  <div class="calendar-year">

    <!-- Calendar grid -->
    <ol class="unit-grid">
      <CalendarUnit
        v-for="(label, key) in months"
        :unitKey="this.pad(key + 1)"
        unit="month"
        :label="label"
        :is-current-unit="this.currentDate.format('YYYY-MM') === this.currentDate.format('YYYY-') + this.pad(key + 1)"
        :tasks="this.monthTasks[this.pad(key + 1)]"
        :onNewTask="onNewTask"
      />
    </ol>
  </div>
</template>

<script>
import dayjs from 'dayjs/esm/index.js'
import CalendarUnit from "./CalendarUnit.vue";

export default {
  name: "CalendarYear",
  props: ["date", "tasks", "onNewTask"],
  components: {
    CalendarUnit
  },

  data() {
    return {
      currentDate: dayjs(this.date),
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
    };
  },

  methods: {
    pad(number) {
      return Number(number) <= 9 ? "0" + number.toString() : number.toString();
    }
  },

  computed: {
    // Returns a hash with days in current month as the key and the value as an array of tasks on that day.
    monthTasks() {
      let data = {};
      for (let index in this.months) {
        let monthKey = this.pad(Number(index) + 1);
        data[monthKey] = this.tasks.filter(t => dayjs(t.from).format("YYYY-MM") == this.currentDate.format("YYYY") + "-" + monthKey)
      }

      return data
    },

    month() {
      return Number(this.currentDate.format("MM"));
    },

    year() {
      return Number(this.currentDate.format("YYYY"));
    },
  },
};
</script>

<style scoped>
.calendar-year {
  position: relative;
  background-color: var(--grey-200);
  border: solid 1px var(--grey-300);
}

.unit-month {
  color: var(--grey-800);
  font-size: 18px;
  background-color: #fff;
  padding-bottom: 5px;
  padding-top: 10px;
}

.unit-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  height: 100%;
  position: relative;
  grid-column-gap: var(--grid-gap);
  grid-row-gap: var(--grid-gap);
  border-top: solid 1px var(--grey-200);
}
</style>
