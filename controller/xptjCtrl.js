const userDao = require("../dao/userDao")

module.exports= {
    xptj(req, resp) {
        userDao.userDao().then(function (connection) {
            if (!req.session.data) {
                var user = {
                    dataType: false,
                    u_nickname: undefined,
                    u_phone: undefined
                }
            } else {
                var user = {
                    dataType: req.session.data.dataType,
                    u_nickname: req.session.data.u_nickname,
                    u_phone: req.session.data.u_phone
                }
            }
            connection.query('SELECT * FROM t_xptj_class ', [])
                .then(function (data) {
                    console.log(data)
                    resp.render("view/xptj", {data: data, user: user})
                })
        })
    },
    cxbd(req, resp) {
        let a = req.query.id
        console.log(a)
        userDao.userDao().then(function (connection) {
            if (!req.session.data) {
                var user = {
                    dataType: false,
                    u_nickname: undefined,
                    u_phone: undefined
                }
            } else {
                var user = {
                    dataType: req.session.data.dataType,
                    u_nickname: req.session.data.u_nickname,
                    u_phone: req.session.data.u_phone
                }
            }
            connection.query('SELECT xptj_imgSrc,c_xptj_id,xptj_name,d_id\n' +
                'FROM t_xptj JOIN t_xptj_class JOIN t_details  \n' +
                'WHERE xptj_class=c_xptj_id AND d_chinese=xptj_name\n' +
                'and c_xptj_id=? order by xptj_imgSrc ', [a])
                .then(function (data) {
                    console.log(data)
                    if (data && a == 1) {
                        resp.render("view/cxbd", {data: data, user: user})
                    } else if (data && a == 2) {
                        resp.render("view/ppgs", {data: data, user: user})
                    } else if (data && a == 3) {
                        resp.render("view/kzxh", {data: data, user: user})
                    } else if (data && a == 5) {
                        resp.render("view/zwjy", {data: data, user: user})
                    } else if (data && a == 6) {
                        resp.render("view/jzws", {data: data, user: user})
                    }
                })
        })
    }
}





