/*
 * @Author: 林俊丞
 * @Date: 2021-09-20 20:46:20
 * @LastEditors: cheng
 * @LastEditTime: 2021-09-28 20:56:16
 * @Description: 注册表单
 */
import React from 'react'
// import { User } from 'screens/project-list/search-panel';
// import { login } from 'auth-provider';
import { useAuth } from 'context/auth-context';
import { useAsync } from 'utils/use-Async';
// 引入组件库
import { Form, Input } from 'antd'
import { LongButton } from './index';
// const apiUrl = process.env.REACT_APP_API_URL
export const RegisterScreen = ({ onError }: { onError: (error: Error) => void }) => {
    // 使用 useAuth 自定义 hook，这样我们就能直接的通过调用这个 自定义hook 来获取数据
    // 解构出两个对象
    const { register } = useAuth()
    const { run, isLoading } = useAsync(undefined, { throwOnError: true })
    // 点击提交按钮时触发的事件，注意这里的 event 的类型是根据场景来变化的
    // cpassword 验证密码是否一致
    // 单独放出 cpassword，其余正常，cpassword 采用前端认证
    // 在 onFinish 中能够接收到 用户提交的数据 key-value
    const handleSubmit = ({ cpassword, ...values }: { username: string, password: string, cpassword: string }) => {
        if (cpassword !== values.password) {
            onError(new Error('请确认两次密码相同'))
            return
        }
        // 发送注册请求
        // 添加 run 后会导致错误不显示，未解决
        run(register(values)).catch(onError)
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
            {/* 确认密码字段 */}
            <Form.Item name={'cpassword'} rules={[{ required: true, message: '确认密码' }]}>
                <Input placeholder={"确认密码"} type="password" id={"cpassword"} />
            </Form.Item>
            <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>注册</LongButton>
        </Form>
    )
}

