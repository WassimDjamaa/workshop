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
          <div class="card" v-for="product in filteredList">

            <div class="img-container">
              <!-- Utilisation de l'URL relative pour charger l'image -->
              <img v-bind:src="`../src/assets/img/${product.img}`" alt="product">
            </div>
            
            <div class="product-details">
              <h2>{{ product.description }}</h2>
              <p>Prix: {{ product.price }}€</p>
            </div>

            <div class="card-icons">
                <div class="like-container">
                  <input
                    type="checkbox"
                    :value=product.id
                    name="checkbox"
                    v-bind:id="product.id"
                  />
                  <label v-bind:for="product.id">
                    <i class="fas fa-heart"></i>
                  </label>
                </div>

                <div class="add-to-cart">
                  <button>
                    <i class="fas fa-shopping-cart"></i>
                  </button>
                </div>
            </div>
          </div>
        </div>
      </div>

       <!-- no result message -->
       <div v-if="filteredList.length == []" class="no-result">
            <p>Aucun résultat</p>
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
          { id: 2, description: 'Curren Business', price: 20, img: 'curren-business.JPG' },
          { id: 3, description: 'Curren Sport', price: 5, img: 'curren-sport.JPG' },
          { id: 4, description: 'Jaragar Racing', price: 8, img: 'jaragar-racing.JPG' },
          { id: 5, description: 'Liges Hommes', price: 3, img: 'liges-hommes.JPG' },
          { id: 6, description: 'Maserati Mechanical', price: 65, img: 'maserati-mechanical.JPG' },
          { id: 7, description: 'Montre Mecanique', price: 25, img: 'montre-mecanique.JPG' },
          { id: 8, description: 'Brand Designer', price: 28, img: 'brand-designer.JPG' },
          { id: 9, description: 'Relogio Masculino', price: 4, img: 'relogio-masculino.JPG' },
          { id: 10, description: 'Tissot Multifunction', price: 29, img: 'tissot-multifunction.JPG' },
          { id: 11, description: 'Hip Hop Gold', price: 87, img: 'hiphop-gold.JPG' },
          { id: 12, description: 'Mesh Genova', price: 6, img: 'mesh-genova.JPG' },
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
