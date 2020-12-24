const userDao = require('../dao/userDao')
module.exports={
    getGoods(req,resp){
        userDao.userDao().then(function (connection) {
            let goodsData = [];
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
            connection.query(`SELECT d_id, g_name,g_descript,d_price,d_smallSrc FROM t_goods JOIN t_details WHERE d_id=g_id AND g_c_id = 1 `,[])
                .then(function (data) {
                    let itemNew1 = data;
                    goodsData.push(itemNew1);
                    connection.query(`SELECT d_id, g_name,g_descript,d_price,d_smallSrc FROM t_goods JOIN t_details WHERE d_id=g_id AND g_c_id = 2 `,[])
                        .then(function (data) {
                            let itemNew2 = data;
                            goodsData.push(itemNew2);
                            connection.query(`SELECT d_id, g_name,g_descript,d_price,d_smallSrc FROM t_goods JOIN t_details WHERE d_id=g_id AND g_c_id = 3 `,[])
                                .then(function (data) {
                                    let itemNew3 = data;
                                    goodsData.push(itemNew3);
                                    connection.query(`SELECT d_id, g_name,g_descript,d_price,d_smallSrc FROM t_goods JOIN t_details WHERE d_id=g_id AND g_c_id = 4 `,[])
                                        .then(function (data) {
                                            let itemNew4 = data;
                                            goodsData.push(itemNew4);
                                            connection.query('SELECT d_id,g_name,g_descript,d_price,d_smallSrc FROM t_details JOIN t_goods WHERE d_chinese=g_name AND d_type="明星产品" LIMIT 3', [])
                                                .then(function (data) {
                                                    var itemNew5 = data;
                                                    goodsData.push(itemNew5)
                                                    resp.render("view/goods", {data:goodsData,user:user})
                                                });

                                        });
                                });
                        });
                })
        })
    },
    getcaizhuang(req,resp){
        userDao.userDao().then(function (connection) {
            let goodsData = [];
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
            connection.query(`SELECT d_id,g_name,g_descript,d_price,d_smallSrc FROM t_goods JOIN t_details WHERE d_id=g_id AND g_c_id = 5 `,[])
                .then(function (data) {
                    let itemNew1 = data;
                    goodsData.push(itemNew1);
                    connection.query(`SELECT d_id,g_name,g_descript,d_price,d_smallSrc FROM t_goods JOIN t_details WHERE d_id=g_id AND g_c_id = 6 `,[])
                        .then(function (data) {
                            let itemNew2 = data;
                            goodsData.push(itemNew2);
                            connection.query(`SELECT d_id,g_name,g_descript,d_price,d_smallSrc FROM t_goods JOIN t_details WHERE d_id=g_id AND g_c_id = 7 `,[])
                                .then(function (data) {
                                    let itemNew3 = data;
                                    goodsData.push(itemNew3);
                                    connection.query(`SELECT d_id,g_name,g_descript,d_price,d_smallSrc FROM t_goods JOIN t_details WHERE d_id=g_id AND g_c_id = 4`,[])
                                        .then(function (data) {
                                            let itemNew4 = data;
                                            goodsData.push(itemNew4);
                                            connection.query('SELECT d_id,g_name,g_descript,d_price,d_smallSrc FROM t_details JOIN t_goods WHERE d_chinese=g_name AND d_type="明星产品" LIMIT 3,3', [])
                                                .then(function (data) {
                                                    var itemNew5 = data;
                                                    goodsData.push(itemNew5)
                                            resp.render("view/caizhuang", {data:goodsData,user:user})
                                                });
                                        });
                                });
                        });
                })
        })
    },
    getxiezhuang(req,resp){
        userDao.userDao().then(function (connection) {
            let goodsData = [];
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
            connection.query(`SELECT d_id,g_name,g_descript,d_price,d_smallSrc FROM t_goods JOIN t_details WHERE d_chinese=g_name AND g_c_id = 1 LIMIT 1 `,[])
                .then(function (data) {
                    let itemNew1 = data;
                    goodsData.push(itemNew1);
                    connection.query(`SELECT d_id,g_name,g_descript,d_price,d_smallSrc FROM t_goods JOIN t_details WHERE d_chinese=g_name AND g_c_id = 2 `,[])
                        .then(function (data) {
                            let itemNew2 = data;
                            goodsData.push(itemNew2);
                            resp.render("view/xiezhuang", {data:goodsData,user:user})
                        })

                })
        })
    },
    getgelidishuang(req,resp){
        userDao.userDao().then(function (connection) {
            let goodsData = [];
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
            connection.query(`SELECT d_id,g_name,g_descript,d_price,d_smallSrc FROM t_goods JOIN t_details WHERE d_chinese=g_name AND g_c_id = 4 LIMIT 1 `,[])
                .then(function (data) {
                    let itemNew1 = data;
                    goodsData.push(itemNew1);
                    connection.query(`SELECT d_id,g_name,g_descript,d_price,d_smallSrc FROM t_goods JOIN t_details WHERE d_chinese=g_name AND g_c_id = 2 `,[])
                        .then(function (data) {
                            let itemNew2 = data;
                            goodsData.push(itemNew2);
                            resp.render("view/gelidishuang", {data:goodsData,user:user})
                        })

                })
        })
    },
    getxiangfen(req,resp){
            userDao.userDao().then(function (connection) {
                let goodsData = [];
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
                connection.query(`SELECT d_id,g_name,g_descript,d_price,d_smallSrc FROM t_goods JOIN t_details WHERE d_id=g_id AND g_c_id = 1 `,[])
                    .then(function (data) {
                        let itemNew1 = data;
                        goodsData.push(itemNew1);
                        connection.query(`SELECT d_id,g_name,g_descript,d_price,d_smallSrc FROM t_goods JOIN t_details WHERE d_id=g_id AND g_c_id = 2 `,[])
                            .then(function (data) {
                                let itemNew2 = data;
                                goodsData.push(itemNew2);
                                connection.query(`SELECT d_id,g_name,g_descript,d_price,d_smallSrc FROM t_goods JOIN t_details WHERE d_id=g_id AND g_c_id = 3 `,[])
                                    .then(function (data) {
                                        let itemNew3 = data;
                                        goodsData.push(itemNew3);
                                        connection.query(`SELECT d_id,g_name,g_descript,d_price,d_smallSrc FROM t_goods JOIN t_details WHERE d_id=g_id AND g_c_id = 4 `,[])
                                            .then(function (data) {
                                                let itemNew4 = data;
                                                goodsData.push(itemNew4);
                                                connection.query('SELECT d_id,g_name,g_descript,d_price,d_smallSrc FROM t_details JOIN t_goods WHERE d_chinese=g_name AND d_type="明星产品" LIMIT 3 ', [])
                                                    .then(function (data) {
                                                        var itemNew5 = data;
                                                        goodsData.push(itemNew5)
                                                        resp.render("view/xiangfen", {data:goodsData,user:user})
                                                    });

                                            });
                                    });
                            });
                    })
            })
        },
    getlvye(req,resp){
        userDao.userDao().then(function (connection) {
            let goodsData = [];
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
            connection.query(`SELECT d_id,g_name,g_descript,d_price,d_smallSrc FROM t_goods JOIN t_details WHERE d_chinese=g_name AND d_type="全新上市" LIMIT 1 `,[])
                .then(function (data) {
                    let itemNew1 = data;
                    goodsData.push(itemNew1);
                    connection.query(`SELECT d_id,g_name,g_descript,d_price,d_smallSrc FROM t_goods JOIN t_details WHERE d_chinese=g_name AND g_c_id = 2 `,[])
                        .then(function (data) {
                            let itemNew2 = data;
                            goodsData.push(itemNew2);
                            resp.render("view/lvye", {data:goodsData,user:user})
                        })

                })
        })
    },
    getnanshi(req,resp){
        userDao.userDao().then(function (connection) {
            let goodsData = [];
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
            connection.query(`SELECT d_id,g_name,g_descript,d_price,d_smallSrc FROM t_goods JOIN t_details WHERE d_id=g_id AND g_c_id = 1 `,[])
                .then(function (data) {
                    let itemNew1 = data;
                    goodsData.push(itemNew1);
                    connection.query(`SELECT d_id,g_name,g_descript,d_price,d_smallSrc FROM t_goods JOIN t_details WHERE d_id=g_id AND g_c_id = 2 `,[])
                        .then(function (data) {
                            let itemNew2 = data;
                            goodsData.push(itemNew2);
                    connection.query('SELECT d_id,g_name,g_descript,d_price,d_smallSrc FROM t_details JOIN t_goods WHERE d_chinese=g_name AND d_type="明星产品" LIMIT 3,3', [])
                        .then(function (data) {
                            let itemNew3 = data;
                            goodsData.push(itemNew3)
                            resp.render("view/nanshi", {data:goodsData,user:user})
                        });
                        });
                });



        })
    },
    gethuli(req,resp){
        userDao.userDao().then(function (connection) {
            let goodsData = [];
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
            connection.query(`SELECT d_id,g_name,g_descript,d_price,d_smallSrc FROM t_goods JOIN t_details WHERE d_chinese=g_name AND d_type="畅销榜单" LIMIT 1 `,[])
                .then(function (data) {
                    let itemNew1 = data;
                    goodsData.push(itemNew1);
                    connection.query(`SELECT d_id,g_name,g_descript,d_price,d_smallSrc FROM t_goods JOIN t_details WHERE d_chinese=g_name AND g_c_id = 2 `,[])
                        .then(function (data) {
                            let itemNew2 = data;
                            goodsData.push(itemNew2);
                            resp.render("view/huli", {data:goodsData,user:user})
                        })

                })
        })
    },
    getsearch(req,resp){
        userDao.userDao().then(function (connection) {
            let goodsData = [];
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
            connection.query(`SELECT d_id,g_name,g_descript,d_price,d_smallSrc FROM t_goods JOIN t_details WHERE d_id=g_id AND g_c_id = 1 order by d_price asc`, [])
                .then(function (data) {
                    let itemNew1 = data;
                    goodsData.push(itemNew1);
                    connection.query(`SELECT d_id,g_name,g_descript,d_price,d_smallSrc FROM t_goods JOIN t_details WHERE d_id=g_id AND g_c_id = 1 order by d_price desc`, [])
                        .then(function (data) {
                            let itemNew2 = data;
                            goodsData.push(itemNew2);
                    resp.send(goodsData)
                })
                })
        })
    },
    getgoodxuanran(req,resp){
        userDao.userDao().then(function (connection) {
            let wenzi = req.query.wenzi
            let goodsData = [];
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
            connection.query(`SELECT category_name,category_info FROM t_category  WHERE   category_name = ? `, [wenzi])
                .then(function (data) {
                    let itemNew1 = data;
                    goodsData.push(itemNew1);
                    connection.query(`SELECT d_id,g_name,g_descript,d_price,d_smallSrc FROM t_goods JOIN t_details WHERE d_id=g_id AND g_category_name = ? `, [wenzi])
                        .then(function (data) {
                            let itemNew2 = data;
                            goodsData.push(itemNew2);
                            connection.query(`SELECT d_id,g_name,g_descript,d_price,d_smallSrc FROM t_goods JOIN t_details WHERE d_id=g_id AND g_c_id = 1 `, [])
                                .then(function (data) {
                                    let itemNew3 = data;
                                    goodsData.push(itemNew3);
                                    resp.send(goodsData)
                                })
                        })
                })
        })
    }
}