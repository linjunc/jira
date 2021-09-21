/*
 * @Author: 林俊丞
 * @Date: 2021-09-20 22:25:51
 * @LastEditors: cheng
 * @LastEditTime: 2021-09-21 21:11:43
 * @Description:  用于管理所有的 context 容器，作为入口文件
 */
import { ReactNode } from "react";
import { AuthProvider } from "./auth-context";
import {QueryClient, QueryClientProvider} from 'react-query'
// 使用我们创建的 authProvider 来创建一个 全局的 provider 来使用
// 所有 App 级别的 provider 都在这里添加
// 这里的 children 其实就是 index.jsx 文件中的 App 组件
export const AppProviders = ({ children }: { children: ReactNode }) => {
    // 当组件挂载时，会先检查 token 值是否存在，进行初始化判断
    // 也就是在全局刷新时会先判断 toke n
    return (
    <QueryClientProvider client={new QueryClient()}>
        <AuthProvider>
            {children}
        </AuthProvider>
    </QueryClientProvider>)


}