! function($) {
    const imgbox = $(".banner_content")
    const img = $(".banner_content .item")
    const btn = $(".banner_list li")
    const rightgo = $(".ico-buttonR")
    const leftgo = $(".ico-buttonL")
    var index = 0;
    var timer = null;
    btn.on('click', function() {
        index = $(this).index()
        changePicture()
    })
    rightgo.on("click", function() {
        console.log(1111);
        index++
        if (index > img.length - 1) {
            index = 0
        }
        changePicture()
    })
    leftgo.on("click", function() {
        index--
        if (index < 0) {
            index = img.length - 1
        }
        changePicture()
    })
    timer = setInterval(function() {
        rightgo.click()
    }, 2000)
    imgbox.hover(function() {
        clearInterval(timer)
    }, function() {
        timer = setInterval(function() {
            rightgo.click()
        }, 2000)
    })

    function changePicture() {
        btn.eq(index).siblings().removeClass('active')
        btn.eq(index).addClass("active")
        img.eq(index).siblings().removeClass('active')
        img.eq(index).addClass('active')
    }


}(jQuery)