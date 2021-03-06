// 抽象 http 请求
import qs from "qs"
import * as auth from 'auth-provider'
import { useAuth } from '../context/auth-context';
import { useCallback } from "react";
// 引入统一路径
const apiUrl = process.env.REACT_APP_API_URL
// 定义一个接口 data,token，丰富 RequestInit 类型，RequestInit中没有 token和data
interface Config extends RequestInit {
    token?: string,
    data?: object
}
// 手动配置 http 请求
// endpoint 是指请求路径，关于 RequestInit 类型我们需要通过查看 fetch 来看
export const http = async (endpoint: string, { data, token, headers, ...customConfig }: Config = {}) => {
    // 请求配置
    const config = {
        // 默认为 GET 后面的 customConfig 会覆盖这里的 method
        method: "GET",
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            "Content-Type": data ? 'application/json' : ''
        },
        // 解构其他属性，这里面的值会覆盖前面的值，因此前面的配置都只是默认的配置
        ...customConfig
    }
    // 判断请求的类型，转化为大写字母判断
    if (config.method.toUpperCase() === 'GET') {
        // 拼接请求路径
        endpoint += `?${qs.stringify(data)}`
    } else {
        // 设置请求的 body 为传入数据
        config.body = JSON.stringify(data || {})
    }
    // axios 可以直接再返回状态不为2xx 时抛出异常
    return window.fetch(`${apiUrl}/${endpoint}`, config)
        .then(async response => {
            // 当返回 401 时，退出登录
            if (response.status === 401) {
                // 退出登录
                await auth.logout()
                // 刷新页面
                window.location.reload()
                return Promise.reject({ message: '请重新登录' })
            }
            const data = await response.json()
            if (response.ok) {
                return data
            } else {
                // console.log(data);
                
                // throw Promise.reject(data)
                return Promise.reject(data);
                // throw new Error(data) 
            }
        })
}
export const useHttp = () => {
    const { user } = useAuth()
    // Parameters 在后面会讲到
    // 先解构数组得到2个值，再将数组解构出来这样可以实现，接收值，而不是数组
    // 这是一个箭头函数，接受两个值，一个是 endpoint 一个是 config ，返回的是一个 fetch 对象
    return useCallback((...[endpoint, config]: Parameters<typeof http>) => http(endpoint, { ...config, token: user?.token }),[user?.token])
}
