// 未登录页面
import { LoginScreen } from './login';
import { RegisterScreen } from './register';
import { useState } from 'react';
import { Button, Card } from 'antd';

export const UnauthenticatedApp = () => {
    // 设置当前登录状态 false
    const [isRegister, setIsRegister] = useState(false)
    return <div style={{ display: "flex", justifyContent: "center" }}>
        <Card>
            {/* 判断登录状态 */}
            { 
                isRegister ? <RegisterScreen /> : <LoginScreen />
            }
            <Button onClick={() => setIsRegister(!isRegister)}>切换到{isRegister ? '登录' : '注册'}</Button>
        </Card>

    </div>
}