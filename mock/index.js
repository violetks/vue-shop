const Mock = require('mockjs')

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