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
            
            <div class="card-text">
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
                    v-model="liked"
                    @click="setLikeCookie()"
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
  import productData from '../assets/data/products.json'

  export default {
    name: 'Home',
    data() {
      return {
        products: productData,
        searchKey: '',
        liked: [],
      };
    },

    computed: {
      filteredList() {
        return this.products.filter((product) => {
          return product.description.toLowerCase().includes(this.searchKey.toLowerCase());
        });
      },

      getLikeCookie(){
          let cookieValue = JSON.parse(this.$cookies.get('like'));
          cookieValue == null ? this.liked = [] : this.liked = cookieValue
        },
    },

    methods: {
      setLikeCookie(){
        document.addEventListener('input', () => {
          setTimeout(() => {
           this.$cookies.set('like', JSON.stringify(this.liked));
          }, 300);
        })
      },
    },

    mounted(){
      this.getLikeCookie;
    }
  };
</script>
  
<style scoped>
</style>
