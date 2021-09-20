/*
 * @Author: 林俊丞
 * @Date: 2021-09-20 22:13:13
 * @LastEditors: 林俊丞
 * @LastEditTime: 2021-09-20 22:45:38
 * @Description: 
 */
import React, { ReactNode } from "react";
import { useState } from 'react';
import { User } from "screens/project-list/search-panel";
import * as auth from 'auth-provider'
import { register, login, logout } from '../auth-provider';
const AuthContext = React.createContext<{
    user: User | null,
    register: (form: AuthForm) => Promise<void>,
    login: (form: AuthForm) => Promise<void>,
    logout: () => Promise<void>
} | undefined>(undefined)
AuthContext.displayName = 'AuthContext'

interface AuthForm {
    username: string,
    password: string
}
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const login = (form: AuthForm) => auth.login(form).then(setUser)
    const register = (form: AuthForm) => auth.register(form).then(setUser)
    const logout = () => auth.logout().then(() => setUser(null))
    return <AuthContext.Provider children={children} value={{ user, login, logout, register }} />
}
export const useAuth = () => {
    const context = React.useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth必须在context 中使用')
    }
    return context
}