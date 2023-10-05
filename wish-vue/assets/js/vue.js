const home = {
    template: '<h1>Home</h1>',
    name: 'Home'
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