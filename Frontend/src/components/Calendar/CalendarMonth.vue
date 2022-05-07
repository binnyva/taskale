<!-- Taken from https://css-tricks.com/lets-make-a-vue-powered-monthly-calendar/ -->
<template>
  <!-- Parent container for the calendar month -->
  <div class="calendar-month">
     
    <!-- The calendar header -->
    <div class="calendar-month-header">
      <CalendarDateIndicator
        :selected-date="selectedDate"
        class="calendar-month-header-selected-month"
      />
      <CalendarDateSelector
        :current-date="today"
        :selected-date="selectedDate"
        @dateSelected="selectDate"
      />
    </div>

    <!-- Calendar grid header -->
    <CalendarWeekdays />

    <!-- Calendar grid -->
    <ol class="days-grid">
      <CalendarMonthDayItem
        v-for="day in days"
        :key="day.date"
        :day="day"
        :is-today="day.date === today"
        :tasks="this.dayTasks[day.date]"
        :onNewTask="onNewTask"
      />
    </ol>
  </div>
</template>

<script>
import dayjs from 'dayjs/esm/index.js'
import weekday from "dayjs/esm/plugin/weekday";
import CalendarDateIndicator from "./CalendarDateIndicator.vue";
import CalendarDateSelector from "./CalendarDateSelector.vue";
import CalendarMonthDayItem from "./CalendarMonthDayItem.vue";
import CalendarWeekdays from "./CalendarWeekdays.vue";

dayjs.extend(weekday);

export default {
  name: "CalendarMonth",
  props: ["tasks", "onNewTask"],
  components: {
    CalendarDateIndicator,
    CalendarDateSelector,
    CalendarMonthDayItem,
    CalendarWeekdays
  },

  data() {
    return {
      selectedDate: dayjs()
    };
  },

  methods: {
    selectDate(newSelectedDate) {
      this.selectedDate = newSelectedDate;
    }
  },

  computed: {
    days() {
      return [
        ...this.previousMonthDays,
        ...this.currentMonthDays,
        ...this.nextMonthDays
      ];
    },

    // Returns a hash with days in current month as the key and the value as an array of tasks on that day.
    dayTasks() {
      let monthDays = this.days;
      let data = {};
      for (let i = 0; i < monthDays.length; i++) {
        let dayKey = monthDays[i].date;
        data[dayKey] = this.tasks.filter(t => dayjs(t.from).format("YYYY-MM-DD") == dayKey)
      }

      return data
    },

    today() {
      return dayjs().format("YYYY-MM-DD");
    },

    month() {
      return Number(this.selectedDate.format("M"));
    },

    year() {
      return Number(this.selectedDate.format("YYYY"));
    },

    numberOfDaysInMonth() {
      return dayjs(this.selectedDate).daysInMonth();
    },

    currentMonthDays() {
      return [...Array(this.numberOfDaysInMonth)].map((day, index) => {
        return {
          date: dayjs(`${this.year}-${this.month}-${index + 1}`).format("YYYY-MM-DD"),
          isCurrentMonth: true
        };
      });
    },

    previousMonthDays() {
      const firstDayOfTheMonthWeekday = this.getWeekday(this.currentMonthDays[0].date);
      const previousMonth = dayjs(`${this.year}-${this.month}-01`).subtract( 1, "month" );

      const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday; // Works because first day is sunday(0)

      const previousMonthLastStartDayOfMonth = dayjs(this.currentMonthDays[0].date)
        .subtract(visibleNumberOfDaysFromPreviousMonth, "day")
        .date();

      return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((day, index) => {
          return {
            date: dayjs(
              `${previousMonth.year()}-${previousMonth.month() +
                1}-${previousMonthLastStartDayOfMonth + index}`
            ).format("YYYY-MM-DD"),
            isCurrentMonth: false
          };
        }
      );
    },

    nextMonthDays() {
      const lastDayOfTheMonthWeekday = this.getWeekday(`${this.year}-${this.month}-${this.currentMonthDays.length}`);

      const nextMonth = dayjs(`${this.year}-${this.month}-01`).add(1, "month");

      const visibleNumberOfDaysFromNextMonth = 6 - lastDayOfTheMonthWeekday; // Works because first day is sunday(0)

      return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
        return {
          date: dayjs(`${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`).format("YYYY-MM-DD"),
          isCurrentMonth: false
        };
      });
    }
  },

  methods: {
    getWeekday(date) {
      return dayjs(date).weekday();
    },

    selectDate(newSelectedDate) {
      this.selectedDate = newSelectedDate;
    }
  }
};
</script>

<style scoped>
.calendar-month {
  position: relative;
  background-color: var(--grey-200);
  border: solid 1px var(--grey-300);
}

.day-of-week {
  color: var(--grey-800);
  font-size: 18px;
  background-color: #fff;
  padding-bottom: 5px;
  padding-top: 10px;
}

.day-of-week,
.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.day-of-week > * {
  text-align: right;
  padding-right: 5px;
}

.days-grid {
  height: 100%;
  position: relative;
  grid-column-gap: var(--grid-gap);
  grid-row-gap: var(--grid-gap);
  border-top: solid 1px var(--grey-200);
}
</style>
