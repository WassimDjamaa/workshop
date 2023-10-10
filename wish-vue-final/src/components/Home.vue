<template>
    <div class="home-container">
      <h1>Articles</h1>
      <!-- search display -->
      <input v-model="searchKey" id="search" type="search" placeholder="Rechercher..." autocomplete="off">
      <span v-if="searchKey && filteredList.length >= 1">
        {{ filteredList.length }} résultat<span v-if="filteredList.length >= 2">s</span>
      </span>
  
      <!-- cards display -->
      <div class="card-cart-container">
        <div class="card-container">
          <div class="card" v-for="product in filteredList" :key="product.id">
            <div class="img-container">
              <!-- Utilisation de l'URL relative pour charger l'image -->
              <img :src="`@/assets/img/${product.img}`" :alt="product.description" />
            </div>
            <div class="product-details">
              <h2>{{ product.description }}</h2>
              <p>Prix: {{ product.price }}€</p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script>
  export default {
    name: 'Home',
    data() {
      return {
        products: [
          { id: 1, description: 'Quarz Luxe', price: 12, img: 'quarz-luxe.JPG' },
        ],
        searchKey: '',
      };
    },
    computed: {
      filteredList() {
        return this.products.filter((product) => {
          return product.description.toLowerCase().includes(this.searchKey.toLowerCase());
        });
      },
    },
  };
</script>
  
<style scoped>
</style>
