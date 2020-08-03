require.config({
    paths: {
        jquery: './jquery.min',
        product: './lib/product',
        cookie: './cookie'
    }
});

require(['jquery', 'product'], function($, product) {
    product.render(function(id, price) {
        // console.log($('.gocart'));
        $('.gocart').on('click', function() {

            product.addItem(id, price, $('.num').val());

        })

    });

});