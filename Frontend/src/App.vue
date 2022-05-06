<template>
  <div id="content" class="container mx-auto pt-8">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
body {
  --grey-100: #e4e9f0;
  --grey-200: #cfd7e3;
  --grey-300: #b5c0cd;
  --grey-800: #3e4e63;
  --grid-gap: 1px;
  --day-label-size: 20px;
}

body {
  --bg-main-color: #FFFFFF;
  --bg-sub-color: #FAFAFC;
  --bg-contrast-color: #262626;
  --text-main-color: #18181C;
  --text-sub-color: #5D5D67;
  --text-contrast-color: #ffffff;
  --link-color: #2380ED;
  --border-color: #E5E5E5;
}

body.dark {
  --bg-main-color: #18181C;
  --bg-sub-color: #262626;
  --bg-contrast-color: #FAFAFC;
  --text-main-color: #FAFAFC;
  --text-sub-color: #FFFFFF;
  --text-contrast-color: #5D5D67;
  --link-color: #6D9EFF;
  --border-color: #353535;
}

</style>