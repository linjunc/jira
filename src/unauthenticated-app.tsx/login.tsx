/*
 * @Author: 林俊丞
 * @Date: 2021-09-20 20:46:20
 * @LastEditors: cheng
 * @LastEditTime: 2021-09-22 20:15:30
 * @Description: 
 */
import React from 'react'
import { useAuth } from 'context/auth-context';
import { Form, Input } from 'antd'
import { LongButton } from './index';
import { useAsync } from '../utils/use-Async';
// const apiUrl = process.env.REACT_APP_API_URL
export const LoginScreen = ({ onError }: { onError: (error: Error) => void }) => {
    const { login, user } = useAuth()
    // 采用 useAsync 来封装异步请求，添加loading
    const { run, isLoading } = useAsync(undefined, { throwOnError: true })
    // 传递两个参数
    const handleSubmit = async(values: { username: string, password: string }) => {
        // 采用 antd 组件库后代码优化
        // 添加 run 后会导致错误不显示，未解决
        login(values).catch(onError)
        // 第二种写法
        // try {
        //     await run(login(values))
        // } catch (e:any) {
        //     console.log(e);
            
        //     onError(e)
        // }
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
            <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>登录</LongButton>
        </Form>
    )
}

