let baseUrl = "http://localhost/h5-204/xiangmu";
define(['jquery'], function($) {
    return {
        render: function() {
            $.ajax({
                type: "get",
                url: `${baseUrl}/interface/getall.php`,
                dataType: "json",
                success: function(res) {
                    // console.log(res);
                    let temp = '';
                    res.forEach(elm => {
                        // console.log(elm);
                        let picture = JSON.parse(elm.picture);
                        // console.log(picture);
                        temp += `<div class="fl-products-item">
                        <a href="${baseUrl}/src/html/detail.html?id=${elm.id}">
                        <div class="img-box" href="/product/9010966.html">
                        <img src="${baseUrl}/src/${picture[0].src}" height="240" width="220">
                       
                        </div>
                        <div class="product-content">
                            <p class="product-title">${elm.title}</p>
                            <p class="product-price">
                                <span class="price-sign">¥</span>
                                <span class="price-num" data-pp="9012450">${elm.price}</span>
                            </p>
                            <p class="product-sell">${elm.num}</p>
                        </div>
                    </a>
                </div>`
                    });
                    $('.fl-products').html(temp);
                }
            });
            $(function() { //和拼接的元素放在一起。
                $("img.lazy").lazyload({
                    effect: "fadeIn" //图片显示方式
                });
            });
        }
    }
});