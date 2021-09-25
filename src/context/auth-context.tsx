/*
 * @Author: 林俊丞
 * @Date: 2021-09-20 22:13:13
 * @LastEditors: cheng
 * @LastEditTime: 2021-09-25 14:32:37
 * @Description: 创建一个 auth 作者的共享数据 context
 */
import React, { ReactNode, useCallback } from "react";
import { User } from "screens/project-list/search-panel";
import * as auth from 'auth-provider'
import { useMount } from '../utils/index';
import { http } from "utils/http";
import { useAsync } from '../utils/use-Async';
import { FullPageLoading } from "components/lib";
import { FullPageErrorFallback } from '../components/lib';
import * as authStore from '../score/auth-slice'
import { useDispatch, useSelector } from "react-redux";
import { register, logout, selectUser } from '../score/auth-slice';
// 删除了原先的context 写法
// 定义 auth表单的接口
export interface AuthForm {
    username: string,
    password: string
}
// 定义一个初始化 user 的函数
// 保持用户登录状态，在组件挂载的时候就调用
export const bootstrapUser = async () => {
    let user = null
    // 从本地取出 token
    const token = auth.getToken()
    if (token) {
        // 如果有值，就去发送请求获得 user 信息
        const data = await http('me', { token })
        user = data.user
    }
    // 返回 user
    return user
}

// 在这里我们需要明确 context 的用法
// 1. 使用 context 下的 provider 来包裹子元素，通过value 值来传递数据给子元素
// 2. 在这里我们采用的是接收一个 children 的方式，这样传入进来的 children 节点都能够使用到 auth context 中的共享数据
// 3. 这里看起来比较复杂其实是因为 ts 需要有严格的类型限制，这里需要对每个函数，值，进行类型设置，所以看起来很复杂
// 4. 我们通过调用 AuthProvider 方法，来接收一个 node 参数，返回一个 provider 
// 5. 这样我们只要通过调用这个方法，就能让传入的节点拥有 auth context 的共享数据 
// 6. 在这个函数里封装了一个useMount方法，当组件挂载时会调用进行初始化页面
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // 设置一个user变量 ，由于user 的类型由初始化的类型而定，但不能是 null ，我们需要进行类型断言
    // const [user, setUser] = useState<User | null>(null)
    const { error, isLoading, isIdle, isError, run } = useAsync<User | null>()
    // 采用 redux
    const dispatch: (...args: unknown[]) => Promise<User> = useDispatch()
    //  删除3个参数定义
    // 当组件挂载时，初始化 user
    useMount(() => {
        run(dispatch(authStore.bootstrap()))
    })
    // 当初始化和加载中的时候显示loading
    if (isIdle || isLoading) {
        return <FullPageLoading />
    }
    if (isError) {
        return <FullPageErrorFallback error={error} />
    }
    // 返回一个 context 容器
    // 这个组件挂载了一个 
    return <div>
        {children}
    </div>;
}
// 包装成一个自定义的 hook ，用来创建一个 AuthContext 容器
// 在调用这个hook 的时候，就相当于在子节点中声明一个 context 
// 也就是说只要我们调用这个 useAuth 就能获取数据了
export const useAuth = () => {
    // 定义 dispatch 类型 返回一个 promise
    const dispatch: (...args: unknown[]) => Promise<User> = useDispatch()
    const user = useSelector(selectUser)
    const login = useCallback((form: AuthForm) => dispatch(authStore.login(form)), [dispatch])
    const register = useCallback((form: AuthForm) => dispatch(authStore.register(form)), [dispatch])
    const logout = useCallback(() => dispatch(authStore.logout()), [dispatch])
    // 返回这个 context 数据中心
    return {
        user,
        login,
        register,
        logout
    }
}
