
import Mock from 'mockjs'
// const Mock = require('mockjs')

// 登录验证接口
Mock.mock('/login', 'post', (options) => {
    var req = JSON.parse(options.body);     // 字符串转换成对象
    if (req.username === "admin" && req.password === "xl123456") {
        // 模拟返回数据
        let res = Mock.mock({
            "data": {
                "id": 500,
                "rid": 0,
                "username": "admin",
                "mobile": "123",
                "email": "123@qq.com",
                "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwMCwicmlkIjowLCJpYXQiOjE1MTI1NDQyOTksImV4cCI6MTUxMjYzMDY5OX0.eGrsrvwHm-tPsO9r_pxHIQ5i5L1kX9RX444uwnRGaIM"
            },
            "meta": {
                "msg": "登录成功",
                "status": 200
            }
        })
        return res;
        // console.log("data:" + res.meta.status)
    }
    return false;
})

// 左侧菜单权限接口
Mock.mock('/menus', 'get', {
    data: [
        {
            "id": 101,
            "authName": "用户管理",
            "path": 'users',
            "children": [
                {
                    "id": 110,
                    "authName": '用户列表',
                    "path": 'users',
                    "children": []
                }
            ]
        },
        {
            "id": 102,
            "authName": "权限管理",
            "path": 'rights',
            "children|2": [
                {
                    "id|+1": [120, 121],
                    "authName|+1": ['角色列表', '权限列表'],
                    "path|+1": ['roles', 'rights'],
                    "children": []
                }
            ]
        },
        {
            "id": 103,
            "authName": "商品管理",
            "path": 'goods',
            "children|3": [
                {
                    "id|+1": [130, 131, 132],
                    "authName|+1": ['商品列表', '分类参数', '商品分类'],
                    "path|+1": ['goods', 'rights', 'goods'],
                    "children": []
                }
            ]
        },
        {
            "id": 104,
            "authName": "订单管理",
            "path": 'orders',
            "children": [
                {
                    "id": 140,
                    "authName": '订单列表',
                    "path": 'orders',
                    "children": []
                }
            ]
        },
        {
            "id": 105,
            "authName": "数据统计",
            "path": 'reports',
            "children": [
                {
                    "id": 150,
                    "authName": '数据列表',
                    "path": 'reports',
                    "children": []
                }
            ]
        }
    ],
    "meta": {
        "msg": "获取菜单列表成功",
        "status": 200
    }
})