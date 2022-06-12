<template>
  <div class="home">
    <div id="display-area">
      <h1 class="text-3xl font-bold underline">Taskale</h1>

      <p>Taskale is an experimental approach towards task and project management. In most project management systems, you get this hierarchy: Project &gt; Task. There even might be sub-project, or sub tasks as well. There is an conceptal difference between a project and a task.</p>

      <p class="my-2">Taskale is built to challenge that idea. The central concept of taskale is that <strong>projects are tasks too - but at a different time scale.</strong></p>

      <p class="my-2">Let's take an example of writing a book.</p>

      <p class="my-2">In the traditional project management systems, 'Write a book' would be the main project. It will have a sub project called 'Research topic of the book'. It will have a task called 'Write the introduction to the book'.</p>

      <p class="my-2">In the Taskale model, 'Write a book' would be a task - but at a 1 year time scale. There will be a one month time scale task called 'Research topic of the book'. There will be another task called 'Write the introduction to the book' - which will be a 1 week task.</p>

      <p class="my-2">Its the same task - but at different times scales. </p>

      <p class="my-2">Taskale is an attempt to play with this idea.</p>
      
      <hr />

      <h3 class="text-xl my-2">All Pages</h3>

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
}
</script>

<style scoped>

</style>