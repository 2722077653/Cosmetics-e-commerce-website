/*******************手机号邮箱登录******************/
function add(data){
    $(".login").prepend("<span id='myName'><em><a href='loginDoIt' style='text-decoration: none; color: #918e91; font-size: 20px;'></a></em>欢迎您！</span><span class='logout' onclick='mylogout()'>&nbsp;注销</span>")
    $("#myName>em>a").text(data.u_nickname)
    $("#mylogin").css({
        display:"none"
    })
    $("#loginDiv").css({
        display:"none"
    })
    $(".login #shopCart_fyp").html("<a href='shoppingCart' style='color: #918e91;'>您的购物车</a>")

}
/*关闭登录框*/
function closeLoginDiv() {
    $("#loginTishi").html("")
    $("#loginDiv").css({
        display:"none"
    })
    $("#loginDiv input").val("")
    $(".myregister p").text("")
}
/*手机号邮箱登录*/
function myAccount_login() {
    $("#loginTishi").html("")
    let userName = $("#userName").val()
    let pwd = $("#pwd").val()
    $.ajax({
        type: "post",
        url: "login.do",
        data: {userName,pwd},
        success(data){
            /*console.log(data)*/
            if (data){
                add(data)
            }
            else{
                $("#loginTishi").text("密码账号输入错误，请重新输入！")
                console.log("登录失败")
            }
        }
    })
    $("#userName").val("")
    $("#pwd").val("")
}
/*忘记密码*/
function forgotPassword(){
    $(".forgotPassword").css({
        display:"block"
    })
    $(".myAccount_login").css({
        display:"none"
    })
}
function forgotPwdClick() {
    $("modifyTishi").text("")
    let userPhone = $("#myuserName").val()
    console.log(userPhone)
    $.ajax({
        type:"post",
        url:"/forgotPwdsms.do",
        data:{userPhone},
        success(data){
            if (data==1){
                let count = 60;
                $("#mysendMsg").text(count+"s");
                let timer = null;
                timer = setInterval(function () {
                    if (count > 0) {
                        $("#mysendMsg").css({
                            pointerEvents:"none",
                            backgroundColor:"grey",
                        })
                        count = count - 1;
                        $("#mysendMsg").text(count+"s");
                    }
                    else {
                        $("#mysendMsg").text("获取验证码");
                        $("#mysendMsg").css({
                            pointerEvents:"all",
                            backgroundColor:"#299ac6",
                        })
                        clearInterval(timer);
                    }
                }, 1000);
            }
            else{
                $("#loginPhoneTishi").text("发送失败")
            }
        }
    })
}
function modifyPwdClick() {
    $("#modifyTishi").text("")
    $("#regThishi").text("")
    let code = $("#mycode").val()
    let userPhone = $("#myuserName").val()
    let pwd = $("#mypwd").val()
    $.ajax({
        type:"post",
        url:"modifyVerifyCode.do",
        data:{code,userPhone,pwd},
        success(data){
            if (data){
                console.log(111)
                $("#forgotPassword").css({
                    display:"none"
                })
                $("#myAccount_login").css({
                    display:"block"
                })

            }
            else{
                $("#modifyTishi").text("验证码错误或手机号未注册，请重新输入")
            }
        }
    })
    $(".forgotPassword input").val("")
}

/*滚动条事件*/
/*window.onscroll=function () {
    var myScroll=document.documentElement.scrollTop||document.body.scrollTop;
    if (myScroll>184){
        $("nav").addClass("navbar-fixed-top")
        $(".navbar-fixed-top").autoHidingNavbar();//向下滚动时隐藏导航条
    }else {
        $("nav").removeClass("navbar-fixed-top")
    }
}*/
/*显示登录框*/
function login() {
    $("#loginDiv").css({
        display:"block"
    })
}
/*出生日期下拉框*/
$(function () {
    $.ms_DatePicker({
        YearSelector: ".sel_year",
        MonthSelector: ".sel_month",
        DaySelector: ".sel_day"
    });
    $.ms_DatePicker();
});
/*短信登录*/
function message() {
    $("#loginDiv input").val("")
    $("#loginTishi").html("")
    $("#loginPhoneTishi").text("")
    $(".myAccount_login").css({
        display:"none"
    })
    $(".myregister").css({
        display:"none"
    })
    $(".mySms_login").css({
        display:"block"
    })
}
/*账号登录*/
function account() {
    $("#loginDiv input").val("")
    $("#loginTishi").html("")
    $(".mySms_login").css({
        display:"none"
    })
    $(".myAccount_login").css({
        display:"block"
    })
    $(".forgotPassword").css({
        display:"none"
    })
    $(".myregister").css({
        display:"none"
    })
}
/**********************注册*********************/
/*返回密码登录界面*/
function returnLogin() {
    $("#loginTishi").html("")
    $(".mySms_login").css({
        display:"none"
    })
    $(".myAccount_login").css({
        display:"block"
    })
    $(".myregister").css({
        display:"none"
    })
    $(".myregister p").text("")
    $("#loginDiv input").val("")
}
/*正则判断/重复  邮箱账号*/
var reg
var regPhonenum
function testEmail() {
    $("#emailTestBox").html("")
    let email=$("#email").val();
    let regEmail=/^[\w]{4,16}[@][\w]{1,5}[.][a-zA-Z]{2,3}$/
    $.ajax({
        type:"post",
        url:"regTestEmail.do",
        data:{email},
        success(data){
            if(data==1&&regEmail.test(email)){
                $("#emailTestBox").append("<i class='iconfont icon-zhengque'></i>")
                $("#emailTishi").text("")
                reg = 1
            }
            else if(data==1&&!regEmail.test(email)){
                $("#emailTestBox").append("<i class='iconfont icon-cuowuguanbi-'></i>")
                $("#emailTishi").text("邮箱格式错误")
                reg = 0
            }
            else  if(data==0){
                $("#emailTestBox").append("<i class='iconfont icon-cuowuguanbi-'></i>")
                $("#emailTishi").text("该邮箱已存在")
                reg = 0
            }
        }
    })
}
/*正则判断/重复  手机号*/
function registerPhoneTest() {
    $("#phoneTestBox").html("")
    let phone=$("#userPhone").val()
    let regPhone=/^1(3|4|5|7|8)\d{9}$/
    $.ajax({
        type:"post",
        url:"regTestPhone.do",
        data:{phone},
        success(data){
            if(data==0){
                $("#phoneTestBox").append("<i class='iconfont icon-cuowuguanbi-'></i>")
                $("#phoneTishi").text("号码已注册")
                reg = 0
                regPhonenum=0
            }
            else if(data==1&&!regPhone.test(phone)){
                $("#phoneTestBox").append("<i class='iconfont icon-cuowuguanbi-'></i>")
                $("#phoneTishi").text("号码格式错误")
                reg = 0
                regPhonenum=0
            }
            else if(data==1&&regPhone.test(phone)){
                $("#phoneTestBox").append("<i class='iconfont icon-zhengque'></i>")
                $("#phoneTishi").text("")
                reg = 1
                regPhonenum=1
            }

        }
    })

}
/*注册*/
function register() {
    $(".mySms_login").css({
        display:"none"
    })
    $(".myAccount_login").css({
        display:"none"
    })
    $(".myregister").css({
        display:"block"
    })
}
/*发送验证码注册*/
function regsendClick() {
    let userPhone = $("#userPhone").val()
    if (regPhonenum==1){
        $.ajax({
            type:"post",
            url:"/regsms.do",
            data:{userPhone},
            success(data){
                let count = 60;
                $("#sendMsg").text(count+"s");
                let timer = null;
                timer = setInterval(function () {
                    if (count > 0) {
                        $("#getMsg").css({
                            pointerEvents:"none",
                            backgroundColor:"grey",
                        })
                        count = count - 1;
                        $("#getMsg").text(count+"s");
                    }
                    else {
                        $("#getMsg").text("获取验证码");
                        $("#getMsg").css({
                            pointerEvents:"all",
                            backgroundColor:"#299ac6",
                        })
                        clearInterval(timer);
                    }
                }, 1000);
            }
        })
    }
}
/*验证验证码注册*/
function regPhone() {
    let code = $("#verification").val()
    let phone = $("#userPhone").val()
    $.ajax({
        type:"post",
        url:"regVerifyCode.do",
        data:{code,phone},
        success(data){
            if (data){
                reg=1
            }
            else{
                reg=0
            }
        }
    })
    $("#code").val("")
    $("#phone").val("")
}
// 这个函数在控制什么时候该提交  什么时候不该提交
function registerIf() {
    return reg&&ifPwd()&&regPhonenum?true:false
}
function ifPwd() {
    $("#pwdTestBox").html("")
    let pwd1 = $("#pwd1").val()
    let pwd2 = $("#pwd2").val()
    if (pwd1==pwd2&&pwd1!=""&&pwd2!="") {
        $("#pwdTestBox").append("<i class='iconfont icon-zhengque'></i>")
        return true
    }
    else {
        $("#pwdTestBox").append("<i class='iconfont icon-cuowuguanbi-'></i>")
        return false
    }
}
function registerDo() {
    // $("#mytable input[type=text]").text("")
    $("#regThishi").text("")
    let nickname=$("#nickname").val()
    let userPhone=$("#userPhone").val()
    let pwd1=$("#pwd1").val()
    let email=$("#email").val()
    let birth=$("#sel_year").val()+"-"+$("#sel_month").val()+"-"+$("#sel_day").val()
    let sex=$("input[type='radio']:checked").val()
    if (sex==1){
        sex="男"
    } else {
        sex="女"
    }
    if (registerIf()) {
        $.ajax({
            type: "post",
            url: "reg.do",
            data: {nickname,userPhone,pwd1,email,birth,sex},
            success(data) {
                if (data){
                    add(data)

                }
                else {
                    console.log("注册失败")
                }
            }
        })
    }
    else {
        $("#regThishi").text("信息有误，请重新输入")
    }
}
/*********************发送验证码登录*********************/
function sendClick() {
    $("loginPhoneTishi").text("")
    let userPhone = $("#phone").val()
    console.log(userPhone)
    $.ajax({
        type:"post",
        url:"/sms.do",
        data:{userPhone},
        success(data){
            if (data==1){
                let count = 60;
                $("#sendMsg").text(count+"s");
                let timer = null;
                timer = setInterval(function () {
                    if (count > 0) {
                        count = count - 1;
                        $("#sendMsg").text(count+"s");
                        $("#sendMsg").css({
                            pointerEvents:"none",
                            backgroundColor:"grey",
                        })
                    }
                    else {
                        $("#sendMsg").text("获取验证码");
                        $("#sendMsg").css({
                            pointerEvents:"all",
                            backgroundColor:"#299ac6",
                        })
                        clearInterval(timer);
                    }
                }, 1000);
            }
            else{
                $("#loginPhoneTishi").text("发送失败")
            }
        }
    })
}
/*验证验证码登录*/
function mySms_login() {
    $("#loginPhoneTishi").text("")
    let code = $("#code").val()
    let phone = $("#phone").val()
    $.ajax({
        type:"post",
        url:"verifyCode.do",
        data:{code,phone},
        success(data){
            if (data){
                add(data)
            }
            else{
                $("#loginPhoneTishi").text("验证码错误或手机号未注册，请重新输入")
            }
        }
    })
    $("#code").val("")
    $("#phone").val("")
}
/*点击注销*/
function mylogout() {
    console.log(234)
    $.ajax({
        type: "post",
        url: "logout.do",
        data: {},
        success(data) {
            $("#logoutName").remove()
            $("#myName").remove()
            $(".logout").remove()
            $(".login").prepend(`<span onclick="login()" id="mylogin">登录|注册</span>`)
            $(".login #shopCart_fyp").html("您的购物车")
        }
    })
}

