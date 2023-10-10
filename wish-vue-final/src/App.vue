<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <img alt="Vue log" src="./assets/img/wish-logo-800.png" width="130" height="50" />

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/user-settings">User Settings</RouterLink>
        <RouterLink to="/wish-list">Wish List</RouterLink>
        <RouterLink to="/shopping-cart">shopping-cart</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
