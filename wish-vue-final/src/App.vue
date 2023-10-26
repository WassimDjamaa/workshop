<template>
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"/>
  <header>
    <nav>
      <div class="nav-container">
        <div id="logo">
          <RouterLink to="/">
            <img alt="Wish" src="./assets/img/wish-logo-800.png" />
          </RouterLink>
        </div>

          <ul id="icons">
            <li>
              <RouterLink to="/user-settings">
                <i class="fas fa-user"></i>
              </RouterLink>
            </li>

            <li>
              <RouterLink to="/wish-list">
                <i class="fas fa-heart"></i>
              </RouterLink>
            </li>

            <li>
              <RouterLink to="/shopping-cart">
                <i class="fas fa-shopping-cart"></i>
              </RouterLink>
            </li>

            <li>
              <RouterLink @click="logout" to="/login">
                <i class="fas fa-sign-in-alt"></i>
              </RouterLink>
            </li>
          </ul>
        </div>
    </nav>
  </header>

  <RouterView />
</template>

<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import './assets/style/style.css'
  import './assets/style/main.scss'
 
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
</script>

<style scoped>

</style>
