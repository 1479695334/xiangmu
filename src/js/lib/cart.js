let baseUrl = "http://localhost/h5-204/xiangmu";
define(['jquery', 'cookie'], function($, cookie) {
    return {
        render: function() {
            let shop = cookie.get('shop'); //   获取cookie数据
            // console.log(shop);
            if (shop.length) {
                shop = JSON.parse(shop);
                let idlist = shop.map(elm => elm.id).join();
                $.ajax({
                    type: "get",
                    url: `${baseUrl}/interface/shop.php`,
                    data: {
                        idlist: idlist
                    },
                    dataType: "json",
                    success: function(res) {
                        // console.log(res);
                        let tempstr = '';
                        res.forEach(elm => {
                            // console.log(elm);
                            let picture = JSON.parse(elm.picture);

                            // cookie中获取 于当前从数据库中遍历出的相同元素
                            let arr = shop.filter(val => val.id == elm.id);

                            console.log(arr);

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
                        </ul>    
                            `;
                        });
                        //删除功能
                        $('.shopcart-body').html(tempstr);
                        $('.shopcart-body').on('click', '.delete', function() {
                            let that = this;
                            let shop1 = [];
                            let flag = confirm('是否删除');

                            if (flag) {
                                shop.forEach(function(elm) {
                                    if (elm.id != that.id) {
                                        shop1.push(elm);

                                    }
                                })

                                shop1 = JSON.stringify(shop1);

                                cookie.set('shop', shop1, 1);
                                //删除dom元素
                                $(this).parents('.OneData').remove();

                                // location.reload();
                            }
                        });
                        // 添加数量功能
                        $('.shopcart-body').on('input', '.lastNum', function() {

                            console.log($(this).parent().siblings('.check')[0].checked);
                            let that = this;
                            let newSum;
                            shop.forEach(function(elm) {
                                if (elm.id == that.id) {
                                    newSum = that.value * elm.price
                                }
                                // console.log(newSum);
                            })



                            // 选择单选添加到总价
                            let _prevPrice = (+$(this).parent().siblings('.One-price').children('p').html().slice(1));
                            $(this).parent().siblings('.One-price').children('p').html('￥' + newSum);
                            if ($(this).parent().siblings('.check')[0].checked) {

                                let _nextPrice = (+$(this).parent().siblings('.One-price').children('p').html().slice(1));
                                let _lastPrice = _nextPrice - _prevPrice;
                                let _accountPrice = (+$('.account-num').html());
                                _accountPrice += _lastPrice;
                                $('.account-num').html(_accountPrice);
                            };

                        })




                        // 单选功能
                        $('.shopcart-body').on('click', '.check', function() {
                            // console.log(this.checked);
                            let _price = (+$('.account-num').html());
                            if (this.checked) {
                                let _priceSum = (+$(this).siblings('.One-price').children('p').html().slice(1));
                                _priceSum = _priceSum + _price;
                                $('.account-num').html(_priceSum);
                            } else {
                                let _priceSum = (+$(this).siblings('.One-price').children('p').html().slice(1));
                                _priceSum = _price - _priceSum;
                                $('.account-num').html(_priceSum);
                            }

                            // let sum = 0;
                            // sum += arr[0].num * elm.price
                            // console.log(sum);
                        })

                    }
                });
            }
        }

    }
});