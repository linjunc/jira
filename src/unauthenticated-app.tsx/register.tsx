/*
 * @Author: 林俊丞
 * @Date: 2021-09-20 20:46:20
 * @LastEditors: cheng
 * @LastEditTime: 2021-09-21 17:01:28
 * @Description: 注册表单
 */
import React, { FormEvent } from 'react'
// import { User } from 'screens/project-list/search-panel';
// import { login } from 'auth-provider';
import { useAuth } from 'context/auth-context';
// 引入组件库
import { Form, Input, Button } from 'antd'
import { LongButton } from './index';
// const apiUrl = process.env.REACT_APP_API_URL
export const RegisterScreen = () => {
    // 使用 useAuth 自定义 hook，这样我们就能直接的通过调用这个 自定义hook 来获取数据
    // 解构出两个对象
    const { register } = useAuth()
    // 点击提交按钮时触发的事件，注意这里的 event 的类型是根据场景来变化的
    const handleSubmit = (values: { username: string, password: string }) => {
        // 发送注册请求
        register(values)
    }
    // 返回的表单结构
    return (
        <Form onFinish={handleSubmit}>
            <Form.Item name={'username'} rules={[{ required: true, message: '请输入用户名' }]}>
                <Input placeholder={"用户名"} type="text" id={"username"} />
            </Form.Item>
            <Form.Item name={'password'} rules={[{ required: true, message: '请输入密码' }]}>
                <Input placeholder={"密码"} type="password" id={"password"} />
            </Form.Item>
            <LongButton htmlType={"submit"} type={"primary"}>注册</LongButton>
        </Form>
    )
}

