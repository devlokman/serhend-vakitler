<template>
  <template v-if="darkMode">
    <img src="../../../public/logo.png" width="100px"/>
  </template>
  <template v-else>
    <img src="../../../public/logo_green.png" width="100px"/>
  </template>
</template>

<script setup lang="ts">

defineProps(['darkMode']);

</script>

<style scoped>

</style>