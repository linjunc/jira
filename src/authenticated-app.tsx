// 已经登录的页面
import React from "react";
import { ProjectListScreen } from './screens/project-list/index';
import { useAuth } from './context/auth-context';
import { Button } from "antd";
export const AuthenticatedApp = () => {
    const { logout } = useAuth()
    return <div>
        <Button onClick={logout}>登出</Button>
        <ProjectListScreen />
    </div>
}