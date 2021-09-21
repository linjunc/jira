/*
 * @Author: 林俊丞
 * @Date: 2021-09-20 20:46:20
 * @LastEditors: cheng
 * @LastEditTime: 2021-09-21 21:00:31
 * @Description: 
 */
import React from 'react'
import { useAuth } from 'context/auth-context';
import { Form, Input } from 'antd'
import { LongButton } from './index';
// const apiUrl = process.env.REACT_APP_API_URL
export const LoginScreen = () => {
    const { login, user } = useAuth()
    // 传递两个参数
    const handleSubmit = (values: { username: string, password: string }) => {
        // 采用 antd 组件库后代码优化
        login(values)
    }
    return (
        <Form onFinish={handleSubmit}>
            {
                user ? <div> 登录成功，用户名 {user?.name}，{user.token}</div> : null
            }
            <Form.Item name={'username'} rules={[{ required: true, message: '请输入用户名' }]}>
                <Input placeholder={"用户名"} type="text" id={"username"} />
            </Form.Item>
            <Form.Item name={'password'} rules={[{ required: true, message: '请输入密码' }]}>
                <Input placeholder={"密码"} type="password" id={"password"} />
            </Form.Item>
            <LongButton htmlType={"submit"} type={"primary"}>登录</LongButton>
        </Form>
    )
}

