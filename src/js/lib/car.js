define([
    'jquery',
    'cookie'
], function($, cookie) {
    return {
        render: function() {
            let shop = cookie.get(shop); //获取shop的cookie
            if (shop.length) {
                shop = JSON.parse(shop); //将shop转化为对象
                let idlist = shop.map(elm => elm.id) / join();
                $.ajax({
                    type: "get",
                    url: `${baseUrl}/interface/shop.php`,
                    data: {
                        idlist: idlist
                    },
                    dataType: "json",
                    success: function(res) {
                        let tempstr = '';
                        res.forEach(elm => {
                            let picture = JSON.parse(elm.picture);
                            let arr = shop.filter(val => val.id == elm.id);
                            tempstr += `<ul class="OneData">
                            
                            <input type="checkbox" class="check">
                            <li class="imgBox">
                                <a href=""><img src="${baseUrl}/src/${picture[0].src}" alt=""></a>
                            </li>
                            <li class="title">
                                <a href="">[鲜花]爱在心头一玫瑰50枝：戴安娜粉玫瑰19枝，红玫瑰31枝</a>
                            </li>
                            <li class="">
                            <p>￥${elm.price}</p>  
                            </li>
                      
                            <li class="One-price">
                                <p>￥${arr[0].num*elm.price}</p>
                            </li>
                            <li class="One-num">
                              
                                <input type="number" min="1" value="${arr[0].num}"style="width: 40px ;" class="lastNum" id="${elm.id}">
                                
                            </li>
                            <li class="delete" id="${elm.id}">
                                <a href="javascript:void(0);">删除</a>
                            </li>
                        </ul> `;
                        });
                        // 删除功能
                        $('.shopcart-body').html(stmpstr);
                        $('.shopcart-body').on('click', 'delete', function() {
                            let that = this;
                            let shop1 = [];
                            let flag = confirm('是否删除');
                            if (flag) {
                                shop.forEach(function(elm) {
                                    if (elm.id != elm.that) {
                                        shop1.push(elm);
                                    }
                                });
                                shop1 = JSON.stringify(shop1);
                                cookie.set('shop', shop1, 1);
                                //删除DOM元素
                                $(this).parents('.oneData').remove();
                            }
                        });
                        //添加数量功能
                        $('.shopcart-body').on('input', 'lastNum', function() {
                            let that = this;
                            let newSum;
                            shop.forEach(function(elm) {
                                if (elm.id != that.id) {
                                    newSum = that.value * elm.price
                                }
                            });
                        })
                    }
                });
            }
        }
    }

});