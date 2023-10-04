

const home = {
    template: '<h1>Home</h1>',
    name: 'Home'
}

const userSettings = {
    template: '<h1>userSettings</h1>',
    name: 'userSettings'
}

const wishList = {
    template: '<h1>wishList</h1>',
    name: 'wishList'
}

const shoppingCart = {
    template: '<h1>shoppingCart</h1>',
    name: 'shoppingCart'
}

const router = new VueRouter({
    routes: [
        { path: '/', component: home },
        { path: '/user-settings', component: userSettings },
        { path: '/wish-list', component: wishList },
        { path: '/shopping-cart', component: shoppingCart },
    ]
});

const vue = new Vue({
    router,
}).$mount('#app');