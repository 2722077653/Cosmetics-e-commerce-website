const userDao = require("../dao/userDao")
const sms = require("leancloud-storage")
const app_id="wlbVp1trqOVSytqR7EdS9oDK-gzGzoHsz"
const app_key="Xc5VoVR25JrT5BBeGeMxqX6X"
sms.init({
    appId:app_id,
    appKey:app_key
})
module.exports = {
    /* 手机号短信登录验证 */
    logsmsPhone(req,resp){
        //拿到手机号，给第三方发送
        let phone=req.body.userPhone
        console.log(phone)
        sms.Cloud.requestSmsCode({
            mobilePhoneNumber:phone,
            name:"三阶段项目",
            code:"验证码",
            ttl:1,//有效时间，需在1分钟之内输入验证码
            op:"注册"
        }).then(function (data) {
            resp.send("1")
        }).catch(function (err) {
            resp.send("0")
        })
    },
    logverifyCode(req,resp){
        let {code,phone}=req.body
        sms.Cloud.verifySmsCode(code,phone).then(function () {
            userDao.userDao().then(function (connection){
                connection.query('SELECT u_nickname,u_phone,u_email FROM t_user WHERE u_phone = ?',[phone])
                    .then(function (data) {
                        if (data.length>0){
                            var user={
                                dataType:true,
                                u_nickname:data[0].u_nickname,
                                u_phone:data[0].u_phone
                            }
                            req.session.data=user
                            console.log(req.session.data)
                            resp.send(user)
                        }
                        else {
                            resp.send("")
                        }
                    })
            })
        }).catch(function (err) {
            resp.send("")
        })
    },
    /* 手机号短信注册验证 */
    regsmsPhone(req,resp){
        //拿到手机号，给第三方发送
        let phone=req.body.userPhone
        console.log(phone)
        sms.Cloud.requestSmsCode({
            mobilePhoneNumber:phone,
            name:"三阶段项目",
            code:"验证码",
            ttl:1,//有效时间，需在1分钟之内输入验证码
            op:"注册"
        }).then(function (data) {
            resp.send("发送成功")
        }).catch(function (err) {
            resp.send("发送失败")
        })
    },
    regVerifyCode(req,resp){
        let {code,phone}=req.body
        sms.Cloud.verifySmsCode(code,phone).then(function () {
            resp.send("1")
        }).catch(function (err) {
            resp.send("0")
        })
    },
    /* 换手机号短信验证 */
    newPhoneSms(req,resp){
        let {messagePhone} = req.body
        if(!req.session.data){
            var user = {
                dataType:false,
                u_nickname:undefined,
                u_phone:undefined
            }
        }else{
            var user = {
                dataType:req.session.data.dataType,
                u_nickname:req.session.data.u_nickname,
                u_phone:req.session.data.u_phone
            }
        }
        if(user.dataType){
            // 往 18612345678 这个手机号码发送短信，使用预设的模板和签名
            sms.Cloud.requestSmsCode({
                mobilePhoneNumber: messagePhone,  // 目标手机号
                name:"三阶段项目",
                code:"验证码",
                ttl:1,//有效时间，需在1分钟之内输入验证码
                op:"更换手机"
            }).then(function(data){
                //调用成功
                resp.send("1")
            }, function(err){
                //调用失败
                console.log(err)
                resp.send("0")
            });
        }else{
            resp.redirect('index')
        }
        
    },
    newPhoneVerificationCodeDo(req,resp){
        let {newPhone,newPhoneVerificationCode} = req.body
        if(!req.session.data){
            var user = {
                dataType:false,
                u_nickname:undefined,
                u_phone:undefined
            }
        }else{
            var user = {
                dataType:req.session.data.dataType,
                u_nickname:req.session.data.u_nickname,
                u_phone:req.session.data.u_phone
            }
        }
        if(user.dataType){
            sms.Cloud.verifySmsCode(newPhoneVerificationCode,newPhone).then(function(){
                userDao.userDao().then(function (connection){
                    connection.query('UPDATE t_score SET i_u_id = ? WHERE i_u_id= ?',[newPhone,user.u_phone])
                        .then(function(data){
                            connection.query('UPDATE t_user SET u_phone = ? WHERE u_phone = ?',[newPhone,user.u_phone])
                                .then(function(data){
                                    connection.query('UPDATE t_order SET o_u_id = ? WHERE o_u_id = ?',[newPhone,user.u_phone])
                                        .then(function(data){
                                            connection.query('UPDATE order_cart SET o_u_id = ? WHERE o_u_id = ?',[newPhone,user.u_phone])
                                                .then(function(data){
                                                    resp.send('1')
                                                })
                                        })
                                })
                        })
                })
            }).catch(function (err) {
                console.log(err)
                resp.send("0")
            })
        }else{
            resp.redirect('index')
        }
        
    },
    /* 忘记密码短信登录验证 */
    forgotPwdsms(req,resp){
        //拿到手机号，给第三方发送
        let phone=req.body.userPhone
        console.log(phone)
        sms.Cloud.requestSmsCode({
            mobilePhoneNumber:phone,
            name:"三阶段项目",
            code:"验证码",
            ttl:1,//有效时间，需在1分钟之内输入验证码
            op:"注册"
        }).then(function (data) {
            resp.send("1")
        }).catch(function (err) {
            resp.send("0")
        })
    },
    modifyVerifyCode(req,resp){
    let {code,userPhone,pwd}=req.body
        console.log(pwd)
    sms.Cloud.verifySmsCode(code,userPhone).then(function () {
        userDao.userDao().then(function (connection){
            connection.query("UPDATE t_user SET u_pwd=? WHERE u_phone=?",[pwd,userPhone])
                .then(function (data) {
                    console.log(data)
                    if (data){
                        console.log("修改成功")
                        resp.send("1")
                    }
                    else {
                        console.log("修改失败")
                        resp.send("0")
                    }
                })
        })
    }).catch(function (err) {
        resp.send("")
    })
}
}