<template>
  <div class="home">
    <div id="display-area">
      <h1 class="text-3xl font-bold underline">
        Hello world!
      </h1>

      <ul>
        <li><router-link to="year">Year View</router-link></li>
        <li><router-link to="month/2022-06-01">Month View</router-link></li>
        <!-- <li><router-link to="day">Day View</router-link></li> -->
      </ul>

    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      
    }
  },

}
</script>

<style scoped>

</style>