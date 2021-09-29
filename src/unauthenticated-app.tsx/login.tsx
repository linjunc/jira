// 关于登录的小总结：主要是通过状态来驱动页面的数据发生改变，与以前采用的原生js不同
// 同时对于错误提示也能有很好的处理方式
// 利用 antd 组件能快速的搭建一个登录表单，当然里面的很多属性都需要熟记，这样才能快速开发

import React from 'react'
import { useAuth } from 'context/auth-context';
import { Form, Input } from 'antd'
import { LongButton } from './index';
import { useAsync } from '../utils/use-Async';
// const apiUrl = process.env.REACT_APP_API_URL
// 登录页面 接收的是一个 error 对象
export const LoginScreen = ({ onError }: { onError: (error: Error) => void }) => {
    const { login } = useAuth()
    // 采用 useAsync 来封装异步请求，添加loading
    const { run, isLoading } = useAsync(undefined, { throwOnError: true })
    // 传递两个参数
    const handleSubmit = async (values: { username: string, password: string }) => {
        // 采用 antd 组件库后代码优化
        // 添加 run 后会导致错误不显示，已解决
        // 这里的catch 会捕获错误，调用 onError 这个函数相当于是 error => onError(error) 
        // 由于在index中传入的props是，onError={setError} 因此就相当于 setError(error)
        run(login(values)).catch(onError)
    }
    // 采用 antd 组件，默认提交，当提交完成时触发 onFinish 调用 handleSubmit
    // 对于loading效果的实现，通过 useAsync 返回当前登录的状态，是否处于 isLoading 状态
    return (
        <Form onFinish={handleSubmit}>
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

