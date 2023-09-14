<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import SelectFile from './components/SelectFile.vue'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <!-- <Navbar v-if="!$route.meta.hideNavbar"/> -->
  <router-view></router-view>
  
</template>
