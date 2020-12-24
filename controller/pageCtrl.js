const userDao = require("../dao/userDao")

module.exports= {
    /*获取index页面数据*/
    index(req, resp) {
        userDao.userDao().then(function (connection) {
            var indexData = [];
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
            connection.query('SELECT d_id,g_name,g_descript,d_price,d_smallSrc FROM t_details JOIN t_goods WHERE d_chinese=g_name AND d_type="全新上市" LIMIT 4', [])
                .then(function (data) {
                var itemNew = data;
                indexData.push(itemNew)
                connection.query('SELECT d_id,g_name,g_descript,d_price,d_smallSrc FROM t_details JOIN t_goods WHERE d_chinese=g_name AND d_type="畅销榜单" LIMIT 4',[])
                    .then(function (data) {
                    var itemSell=data;
                    indexData.push(itemSell)
                        resp.render("index", {data:indexData,user:user})
                })
            })
        })
    },
    service(req, resp) {
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
        resp.render("view/service", {user:user})
    },
    safetyPay(req, resp) {
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
        resp.render("view/safetyPay", {user:user})
    },
    periodicalIndex(req, resp) {
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
        resp.render("view/periodicalIndex", {user:user})
    },
    periodicalPage1(req, resp) {
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
        resp.render("view/periodicalPage1", {user:user})
    },
    loginDo(req, resp){
        let userName=req.body.userName
        let pwd=req.body.pwd
        userDao.userDao().then(function (connection){
            connection.query('SELECT u_nickname,u_phone,u_email FROM t_user WHERE u_pwd = ? AND u_phone = ? OR u_email = ?',[pwd,userName,userName])
                .then(function (data) {
                    if (data.length>0){
                        var user={
                            dataType:true,
                            u_nickname:data[0].u_nickname,
                            u_phone:data[0].u_phone
                        }
                        req.session.data=user
                        resp.send(user)
                    }
                    else {
                        resp.send()
                    }
                })
        })
    },
    logoutDo(req, resp){
        var user = {
            dataType:false,
            u_nickname:undefined,
            u_phone:undefined
        }
        req.session.data=user;
        resp.send("0")
    },
    regTestEmail(req, resp){
        let {email} = req.body
        userDao.userDao().then(function (connection) {
            connection.query('SELECT * FROM t_user WHERE u_email=?',[email])
                .then(function (data) {
                    if(data){
                        if(data.length>0){
                            resp.send("0")
                        }else {
                            resp.send("1")
                        }
                    }
                })
        })
    },
    regTestPhone(req, resp){
        let {phone} = req.body
        userDao.userDao().then(function (connection) {
            connection.query('SELECT * FROM t_user WHERE u_phone=?',[phone])
                .then(function (data) {
                    if(data){
                        if(data.length>0){
                            resp.send("0")
                        }else {
                            resp.send("1")
                        }
                    }
                })
        })
    },
    reg(req, resp){
        let {nickname,userPhone,pwd1,email,birth,sex} = req.body
        userDao.userDao().then(function (connection) {
            connection.query('insert into t_user values (null,?,?,?,?,?,?)',[userPhone,pwd1,email,sex,birth,nickname])
                .then(function (data) {
                    connection.query('INSERT INTO t_score values(null,?,?)',[userPhone,0])
                        .then(function(data){
                            if(data){
                                var user = {
                                    dataType:true,
                                    u_nickname:nickname,
                                    u_phone:userPhone
                                }
                                req.session.data=user;
                                resp.send(user)
                            }
                            else {
                                resp.send("0")
                            }
                        })
                })
        })
    },
    search(req, resp){
        let search = req.body.search
        console.log(search)
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
        let searchTxt = req.body
        searchTxt=`%${searchTxt.search}%`
        userDao.userDao().then(function (connection) {
            connection.query('SELECT DISTINCT d_id,g_name,g_descript,d_price,d_smallSrc FROM t_details JOIN t_goods WHERE g_name LIKE ? AND g_name=d_chinese',[searchTxt])
                .then(function (data) {
                    if(data.length>0){
                        console.log("查询成功")
                        console.log(data)
                        var indexData={
                            mydata:data,
                            pageNum: Math.ceil(data.length/4),
                        }
                        resp.render("view/searchDisplay", {data:indexData,user:user,ser:searchTxt})
                    }
                    else {
                        console.log("查询失败")
                        resp.render("view/searchDisplay", {data:"",user:user,ser:searchTxt})
                    }
                })
        })
    },
    chooseData(req, resp){
        let searTxt = req.body.searTxt
        let pageDataNum = Number(req.body.pageDataNum)
        let pageNum = req.body.pageNum
        pageNum=(pageNum-1)*pageDataNum
        userDao.userDao().then(function (connection) {
            connection.query('SELECT DISTINCT d_id,g_name,g_descript,d_price,d_smallSrc FROM t_details JOIN t_goods WHERE g_name LIKE ? AND g_name=d_chinese limit ?,?',[searTxt,pageNum,pageDataNum])
                .then(function (data) {
                    if(data.length>0){
                        console.log("查找成功")
                        resp.send(data)
                    }
                })
        })
    }
}