
/*
 * @Author: 林俊丞
 * @Date: 2021-09-20 21:05:02
 * @LastEditors: 林俊丞
 * @LastEditTime: 2021-09-20 21:24:33
 * @Description: 中间件
 */
module.exports = (req, res, next) => {
    if (req.method === "POST" && req.path === "/login") {
        if (req.body.username === "小丞" && req.body.password === '123456') {
            return res.status(200).json({
                user: {
                    token: "123"
                }
            })
        }else {
            return res.status(400).json({message:"密码错误或用户名不存在"})
        }
    }
    next()
}