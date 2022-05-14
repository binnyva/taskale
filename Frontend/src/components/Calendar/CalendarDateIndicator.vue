<template>
  <div class="calendar-date-indicator">{{ selectedMonth }}</div>
</template>

<script>
import dayjs from 'dayjs/esm/index.js';

export default {
  name: "CalendarDateIndicator",
  props: ["date"],

  computed: {
    selectedMonth() {
      return dayjs(this.date).format("MMMM YYYY");
    }
  }
};
</script>

<style scoped>
.calendar-date-indicator {
  font-size: 24px;
  font-weight: 600;
  color: var(--grey-100);
}
</style>

