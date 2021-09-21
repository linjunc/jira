/*
 * @Author: 林俊丞
 * @Date: 2021-09-20 22:25:51
 * @LastEditors: 林俊丞
 * @LastEditTime: 2021-09-20 22:32:37
 * @Description:  用于管理所有的 context 容器，作为入口文件
 */
import { ReactNode } from "react";
import { AuthProvider } from "./auth-context";
// 使用我们创建的 authProvider 来创建一个 全局的 provider 来使用
// 所有 App 级别的 provider 都在这里添加
// 这里的 children 其实就是 index.jsx 文件中的 App 组件
export const AppProviders = ({ children }: { children: ReactNode }) => {
    return <AuthProvider>
        {children}
    </AuthProvider>

}