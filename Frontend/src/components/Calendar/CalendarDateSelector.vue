<template>
  <div class="calendar-date-selector">
    <router-link :to="{ path: `/month/` + previousMonth }">﹤</router-link>
    <router-link :to="{ path: `/month/` + today }">Today</router-link>
    <router-link :to="{ path: `/month/` + nextMonth }">﹥</router-link>

  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "CalendarDateSelector",

  props: ["currentDate", "date"],

  computed: {
    previousMonth() {
      return dayjs(this.date).subtract(1, "month").format("YYYY-MM-DD");
    },

    today() {
      // this.$emit("dateSelected", newSelectedDate);
      return dayjs(this.currentDate).format("YYYY-MM-DD");
    },

    nextMonth() {
      return dayjs(this.date).add(1, "month").format("YYYY-MM-DD");
    }
  }
};
</script>

<style scoped>
.calendar-date-selector {
  display: flex;
  justify-content: space-between;
  width: 80px;
  color: var(--grey-800);
}

.calendar-date-selector > * {
  cursor: pointer;
  user-select: none;
}
</style>
