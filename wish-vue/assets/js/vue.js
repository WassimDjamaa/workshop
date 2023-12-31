// data
const products = [
    { id: 1, description: "Quarz Luxe", price: 12, img: 'assets/img/quarz-luxe.JPG'},
    { id: 2, description: 'Curren Business', price: 20, img: 'assets/img/curren-business.JPG'},
    { id: 3, description: 'Curren Sport', price: 5, img: 'assets/img/curren-sport.JPG'},
    { id: 4, description: 'Jaragar Racing', price: 8, img: 'assets/img/jaragar-racing.JPG'},
    { id: 5, description: 'Liges Hommes', price: 3, img: 'assets/img/liges-hommes.JPG'},
    { id: 6, description: 'Maserati Mechanical', price: 65, img: 'assets/img/maserati-mechanical.JPG'},
    { id: 7, description: 'Montre Mecanique', price: 25, img: 'assets/img/montre-mecanique.JPG'},
    { id: 8, description: 'Brand Designer', price: 28, img: 'assets/img/brand-designer.JPG'},
    { id: 9, description: 'Relogio Masculino', price: 4, img: 'assets/img/relogio-masculino.JPG'},
    { id: 10, description: 'Tissot Multifunction', price: 29, img: 'assets/img/tissot-multifunction.JPG'},
    { id: 11, description: 'Hip Hop Gold', price: 87, img: 'assets/img/hiphop-gold.JPG'},
    { id: 12, description: 'Mesh Genova', price: 6, img: 'assets/img/mesh-genova.JPG'},
  ];
  

const home = {
    template: '#home',
    name: 'Home',
    data: () => {
        return {
            products,
            searchKey: '',
            liked: [],
            cart: [],
        }
    },
    computed: {
        filteredList(){
            return this.products.filter((product) => {
              return product.description.toLowerCase().includes(this.searchKey.toLowerCase());
            })
        },

        getLikeCookie(){
            let cookieValue = JSON.parse($cookies.get('like'));
            cookieValue == null ? this.liked = [] : this.liked = cookieValue
        },
    },
    methods: {
        setLikeCookie(){
            document.addEventListener('input', () => {
                setTimeout(() => {
                    $cookies.set('like', JSON.stringify(this.liked));
                }, 300);
            })
        },

        addToCart(product){
            // check if already in array
            const { id, img, description, price } = product;

            for (const elementProduct of this.cart) {  // for of loop
                if (elementProduct.id === product.id) {
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
            product.quantity += 1;
        },

        cartMinusOn(product, id){
            if (product.quantity == 1) {
                this.deleteCartById(id);
            } else {
                product.quantity -= 1;
            }
        },

        deleteCartById(id){
            this.$delete(this.cart, id);
        },

        cartTotalAmount(){
            let total = 0;
            for (const item of this.cart) {
                total = total + (item.quantity * item.price);
            }
            return total;
        },

        cartTotalQuantity(){
            let total = 0;
            for (const item of this.cart) {
                total = total + item.quantity;
            }
            return total;
        },
    },
    mounted: () => {
        this.getLikeCookie;
    }
}

const userSettings = {
    template: '<h1>User Settings</h1>',
    name: 'UserSettings'
}

const wishList = {
    template: '<h1>Wish List</h1>',
    name: 'WishList'
}

const shoppingCart = {
    template: '<h1>Shopping Cart</h1>',
    name: 'ShoppingCart'
}

const router = new VueRouter({
    routes: [
        { path: '/', component: home, name: 'Home' },
        { path: '/user-settings', component: userSettings, name: 'userSettings' },
        { path: '/wish-list', component: wishList, name: 'wishList' },
        { path: '/shopping-cart', component: shoppingCart, name: 'shoppingCart' },
    ]
})

const vue = new Vue({
    router,
}).$mount('#app');