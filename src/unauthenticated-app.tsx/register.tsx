/*
 * @Author: 林俊丞
 * @Date: 2021-09-20 20:46:20
 * @LastEditors: 林俊丞
 * @LastEditTime: 2021-09-20 23:00:09
 * @Description: 
 */
import React, { FormEvent } from 'react'
import { User } from 'screens/project-list/search-panel';
import { login } from 'auth-provider';
import { useAuth } from 'context/auth-context';
const apiUrl = process.env.REACT_APP_API_URL
export const RegisterScreen = () => {
    const { register, user } = useAuth()
    // 传递两个参数

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        // 阻止默认提交
        event.preventDefault()
        // 在 event.currentTarget.elements 中有form 中input 框中的信息
        const username = (event.currentTarget.elements[0] as HTMLInputElement).value
        const password = (event.currentTarget.elements[1] as HTMLInputElement).value
        register({ username, password })
    }
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

