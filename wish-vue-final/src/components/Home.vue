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
                <img v-bind:src="`../src/assets/img/${product.img}`" />
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
                  <button v-on:click="addToCart(product)">
                    <i class="fas fa-shopping-cart"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- no result message -->
            <div v-if="filteredList.length == []" class="no-result">
              <p>Aucun résultat</p>
            </div>
          </div>

        <!-- cart display -->
        <transition name="cart-anim">
          <div v-if="cart.length > 0" class="shopping-cart" id="shopping-cart">
            <h2>Panier</h2>

            <transition-group name="item-anim" tag="div" class="item-group">
              <div v-for="product, id in cart" class="item" v-bind:key="product.id">

                <div class="img-container">
                  <img v-bind:src="`../src/assets/img/${product.img}`" />
                </div>

                <div class="item-description">
                  <h4>{{ product.description }}</h4>
                  <p>{{ product.price }}€</p>
                </div>

                <div class="item-quantity">
                  <h6>Quantité : {{ product.quantity }}</h6>

                  <div class="cart-icons">
                    <button @click="cartPlusOn(product)">
                      <i class="fa fa-plus"></i>
                    </button>

                    <button @click="cartMinusOn(product, product.id)">
                      <i class="fa fa-minus"></i>
                    </button>

                    <button @click="deleteCartById(product.id)">
                      <i class="fa fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </transition-group>
          </div>
        </transition>
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
        cart: []
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

      addToCart(product) {
        // check if already in array
        const { id, img, description, price } = product;

        for (const elementProduct of this.cart) {
          if (elementProduct.id === id) {
            return elementProduct.quantity++; 
          }
        }

        this.cart.push({
          id,
          img,
          description,
          price,
          quantity: 1
        })
      },

      cartPlusOn(product){
        product.quantity += 1
      },

      cartMinusOn(product, id){
            if (product.quantity == 1) {
                this.deleteCartById(id);
            } else {
                product.quantity -= 1;
            }
        },

        deleteCartById(id){
          this.cart = this.cart.filter((product) => product.id !== id);
        },

    },

    mounted(){
      this.getLikeCookie;
    }
  };
</script>
  
<style scoped>
</style>
