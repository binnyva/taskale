<template>
  <div class="month">
    <div class="header">
      <h1 class="text-3xl font-bold">
        Month &gt; May, 2022
      </h1>
    </div>

    <div class="content">
      <BlockList :tasks="intentions" :level="`month`"></BlockList>

      <CalendarMonth date="2022-05-01" :tasks="tasks"></CalendarMonth>
    </div>

  </div>
</template>

<script>
import BlockList from "../components/BlockList.vue"
import CalendarMonth from "../components/Calendar/CalendarMonth.vue"

export default {
  name: 'Month',
  components: {
    BlockList,
    CalendarMonth
  },
  data() {
    return {
      intentions: [{id: 1, name: "MindOS", level: "10year"}, {id: 2, name: "PKM Book", level: "year"}],
      tasks: [{id: 3, name: "Write Outline", level: "day", from: "2022-05-04 00:00:00"}, {id: 4, name: "Create a mockup", from: "2022-05-04 00:00:00"}]
    }
  },

}
</script>

<style scoped>

</style>