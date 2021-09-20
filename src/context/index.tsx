/*
 * @Author: 林俊丞
 * @Date: 2021-09-20 22:25:51
 * @LastEditors: 林俊丞
 * @LastEditTime: 2021-09-20 22:32:37
 * @Description:  
 */
import { ReactNode } from "react";
import { AuthProvider } from "./auth-context";
export const AppProviders = ({ children }: { children: ReactNode }) => {
    return <AuthProvider>
        {children}
    </AuthProvider>

}