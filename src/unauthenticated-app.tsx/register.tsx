/*
 * @Author: 林俊丞
 * @Date: 2021-09-20 20:46:20
 * @LastEditors: 林俊丞
 * @LastEditTime: 2021-09-20 23:00:09
 * @Description: 注册表单
 */
import React, { FormEvent } from 'react'
// import { User } from 'screens/project-list/search-panel';
// import { login } from 'auth-provider';
import { useAuth } from 'context/auth-context';
// const apiUrl = process.env.REACT_APP_API_URL
export const RegisterScreen = () => {
    // 使用 useAuth 自定义 hook，这样我们就能直接的通过调用这个 自定义hook 来获取数据
    // 解构出两个对象
    const { register} = useAuth()
    // 点击提交按钮时触发的事件，注意这里的 event 的类型是根据场景来变化的
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        // 阻止默认提交
        event.preventDefault()
        // 在 event.currentTarget.elements 中有form 中input 框中的信息
        const username = (event.currentTarget.elements[0] as HTMLInputElement).value
        const password = (event.currentTarget.elements[1] as HTMLInputElement).value
        // 发送注册请求
        register({ username, password })
    }
    // 返回的表单结构
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">用户名</label>
                <input type="text" id={"username"} />
            </div>
            <div>
                <label htmlFor="password">密码</label>
                <input type="password" id={"password"} />
            </div>
            <button type="submit">注册</button>
        </form>
    )
}

