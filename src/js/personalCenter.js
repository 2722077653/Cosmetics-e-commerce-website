$('.leftNav').on('click','.leftNavTitle',function(){
    let btnName = $(this).children().children().text()
    //渲染数据时修改以下代码
    $('.leftNavTitle').removeClass('on')
    $('.leftNavTitle').children().children().removeClass('on')
    $(this).addClass('on')
    $(this).children().children().addClass('on')
    console.log(btnName)
    //隐藏显示需要修改
    $('.perIndexContent').css('display','none')
    $('#mainIframe').css('display','block')
})

