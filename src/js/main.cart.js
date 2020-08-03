require.config({
    paths: {
        jquery: './jquery.min',
        cart: './lib/cart',
        cookie: './cookie'
    }
});

require(['cart'], function(cart) {
    cart.render();
});