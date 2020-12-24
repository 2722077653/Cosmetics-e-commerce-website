const userDao = require('../dao/userDao')

module.exports = {
    //登录过后渲染立即支付页面
    lijizhifu(req,resp){
        console.log(112233)
        let zhifu = []
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
                var ord = req.query.ord
                console.log(ord)
                userDao.userDao().then(function(connection){
                    connection.query('SELECT a_id,a_province,a_city,a_area,a_address,a_people,a_phone,a_phone2,setDefault,zipCode FROM t_user JOIN t_address  ON a_u_id = u_id WHERE u_phone = ?',[user.u_phone])
                        .then(function(data){
                            var ittn = data
                            zhifu.push(ittn)
                            /* resp.render("view/lijizhifu",{data:zhifu,user:user}) */
                            connection.query('SELECT d_smallSrc,d_price,d_chinese,ord_o_id,order_status,ord_ord_id,order_class_num,modified_time FROM (order_detail JOIN t_order ON ord_ord_id = o_sn)JOIN t_details ON ord_o_id = d_id WHERE ord_ord_id =?',[ord])
                                .then(function (data) {
                                    if(data.length>0){
                                        var ittn = data
                                        console.log(data)
                                        zhifu.push(ittn)
                                        resp.render("view/lijizhifu",{data:zhifu,user:user})
                                    }
                                })
                        }).catch(function(err){
                        console.log(err)
                    })
                })
            }else{
                resp.redirect('index')
            }
        },
    getPayData(req, resp) {
        let {addressId,totprice,timer,ord_ord_id}=req.body
        userDao.userDao().then(function (connection) {
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
                connection.query('SELECT * FROM t_address WHERE a_id = ?',[addressId])
                    .then(function(data){
                        if(data.length>0){
                            let phone = data[0].a_phone
                            let people = data[0].a_people
                            let province = data[0].a_province
                            let city = data[0].a_city
                            let area = data[0].a_area
                            let address = data[0].a_address
                            let zipCode = data[0].zipCode
                            let phone2 = data[0].a_phone2
                            connection.query("update t_order set o_phone=?,o_user=?,o_province=?,o_city=?,o_area=?,o_address=?,pay_time=?,order_point=?,order_status=20 where o_sn=?", [phone,people,province,city,area,address,timer,totprice,ord_ord_id])
                                .then(function (data) {
                                    if(data){
                                        console.log("更新成功")
                                        resp.send('1')
                                    }
                                })
                        }
                    })
            }else{
                resp.redirect('index')
            }
        })
    }
}
