let baseUrl = "http://localhost/h5-204/xiangmu";

define(['jquery', 'cookie'], function($, cookie) {
    return {
        render: function(callback) {
            let id = location.search.split("=")[1];
            // console.log(id);
            $.ajax({
                type: "get",
                url: `${baseUrl}/interface/getitem.php`,
                data: {
                    id: id
                },
                dataType: "json",
                success: function(res) {
                    console.log(res);
                    let temp = '';

                    let picture = JSON.parse(res.picture);
                    console.log(picture);
                    temp = `<div class="XiaoTu">                 
                                <img src="${baseUrl}/src/${picture[0].src}" alt="">                           
                            </div>
                            <div class="details-r">
                                <p class="title">韩式系列/亲爱的你--粉佳人玫瑰16枝、白和粉色洋桔梗各5枝、尤加利10枝、浅紫色小菊3枝、深粉色绣球1枝</p>
                                <p class="teacher">花艺师打造 韩式花束系列</p>
                                <p class="sell"><span class="sell-num"></span>${res.num}</p>
                                <p class="hengxian"></p>
                                <ul class="introduce">
                                    <li>
                                        <p>类 别：</p><span>鲜花-韩式鲜花系列 编 号：9012455</span>
                                    </li>
                                    <li>
                                        <p>材 料：</p><span>韩式花束系列：粉佳人玫瑰16枝、3头或以上白色洋桔梗5枝、3头或以上粉色洋桔梗5枝、尤加利10枝、浅紫色小菊3枝、深粉色绣球1枝</span>
                                    </li>
                                    <li>
                                        <p>包 装：</p><span>蓝色人造纸8张、白色雪梨纸2张、粉色罗纹烫金丝带1.5米</span>
                                    </li>
                                    <li>
                                        <p>花 语：</p><span>我喜欢的样子你都有</span>
                                    </li>
                                    <li>
                                        <p>附 送：</p><span>下单填写留言，即免费赠送精美贺卡！</span>
                                    </li>
                                    <li>
                                        <p>配 送：</p><span>全国(小城市请提前一天预定)</span>
                                    </li>
                                    <li>
                                        <p>配 送至：</p>
                                        <form action="" class="sanjiliandong">
                                            <select id="prov">
                                                <option value="">请选择省份</option>
                                            </select>
                                            <select id="city">
                                                <option value="">请选择城市</option>
                                            </select>
                                            <select id="country">
                                                <option value="">请选择县区</option>
                                            </select>
                                        </form>
                                    </li>
                                </ul>
                                <p class="hengxian"></p>
                                <p class="price">花礼价：<span class="price-logo"><i class="price-num">￥</i></span>${res.price}</p>
                           
                              
                          
                               <a href="cart.html"> <button class="gocart">加入购物车</button></a>
                            </div>
                            <div class="details-bottomimg">
                                <img src="${baseUrl}/src/${picture[0].src}" alt="" class="details-active" >
                                <img src="${baseUrl}/src/${picture[1].src}" alt=""  class="">
                                <img src="${baseUrl}/src/${picture[2].src}" alt=""   class="">
                                <img src="${baseUrl}/src/${picture[3].src}" alt=""  class="">
                            </div>`
                    $('.details').html(temp);
                    // console.log($('.details-bottomimg'))



                    //三级菜单
                    ! function($) {
                        let $btn = $('#btnclick');
                        let $show = $('#show');
                        let $prov = $('#prov');
                        let $city = $('#city');
                        let $country = $('#country');
                        //provice:数据
                        $.ajax({
                            url: 'city.json',
                            dataType: 'json'
                        }).done(function(provice) {
                            //渲染省份或者直辖市
                            console.log(provice);
                            console.log($prov);
                            $.each(provice, function(index, value) { //index:数组的索引
                                $prov.append('<option value="' + index + '">' + value.name + '</option>');

                                // console.log(provice);
                            });
                            let data = { //存储索引
                                prov: '',
                                city: '',
                                country: ''
                            };
                            //当省份发送改变，渲染对应的城市名称
                            $prov.on('change', function() {
                                let $provindex = this.options[this.selectedIndex].value; //获取对应的option结构  属性value后面的值。
                                if ($provindex !== data.prov) {
                                    data.prov = $provindex;
                                    $show.val('');
                                    $btn.prop('disabled', true);
                                }
                                //=请选择省份=
                                if ($provindex === '=请选择省份=') {
                                    $('#city > option:first').nextAll().remove();
                                    $('#country > option:first').nextAll().remove();
                                    return;
                                }
                                //获取$provindex对应的城市名称
                                if ($provindex !== '') {
                                    $('#city > option:first').nextAll().remove(); //找到第一个option，删除第一个option之后的所有兄弟元素。
                                    $('#country > option:first').nextAll().remove(); //找到第一个option，删除第一个option之后的所有兄弟元素。
                                    let $cityname = provice[$provindex]['city'];
                                    $.each($cityname, function(index, value) { //index:数组的索引
                                        $city.append('<option value="' + index + '">' + value.name + '</option>');
                                    });
                                }
                            });
                            $city.on('change', function() {
                                let $cityindex = this.options[this.selectedIndex].value;
                                if ($cityindex !== data.city) {
                                    data.city = $cityindex;
                                }
                                if ($cityindex === '=请选择城市=') {
                                    $('#country > option:first').nextAll().remove();
                                    return;
                                }
                                if ($cityindex !== '') {
                                    $('#country > option:first').nextAll().remove();
                                    let $countryname = provice[data.prov]['city'][$cityindex].districtAndCounty;
                                    $.each($countryname, function(index, value) { //index:数组的索引
                                        $country.append('<option value="' + index + '">' + value + '</option>');
                                    });
                                }
                            });
                            $country.on('change', function() {
                                let $countryindex = this.options[this.selectedIndex].value;
                                if ($countryindex !== data.city) {
                                    data.country = $countryindex;
                                }
                                if (data.city != '' && $countryindex != '') {
                                    $btn.prop('disabled', false);
                                }
                            });
                            // $prov.html('<option value="#">请选择省份</option>');
                            // $city.html('<option value="#">请选择城市</option>');
                            // $country.html('<option value="#">请选择县区</option>');
                            // $btn.on('click', function() {
                            //     $show.val(provice[data.prov].name + '-' + provice[data.prov]['city'][data.city].name + '-' +
                            //         provice[data.prov]['city'][data.city].districtAndCounty[data.country]);
                            // });
                        });

                    }(jQuery);



                    // 测试
                    $('.details').on('mouseover', '.details-bottomimg img', function() {
                        $(this).siblings().removeClass('details-active');
                        $(this).addClass('details-active');
                        $(this).parent().siblings('.XiaoTu').children('img').attr('src', $(this).attr('src'));
                    })

                    callback && callback(res.id, res.price);
                }
            });
        },
        addItem: function(id, price, num) {
            let shop = cookie.get('shop');
            // console.log(cookie);
            let product = {
                id: id,
                price: price,
                num: num
            }
            console.log(product);

            if (shop) {
                shop = JSON.parse(shop);

                if (shop.some(elm => elm.id == id)) {
                    shop.forEach(elm => {
                        elm.id == id ? elm.num = num : null;
                    });
                } else {
                    shop.push(product);
                }
            } else {
                shop = [];
                shop.push(product);
            }

            cookie.set('shop', JSON.stringify(shop), 1);
        }
    }
});