import { LoginScreen } from './login';
import { RegisterScreen } from './register';
import { useState } from 'react';
export const UnauthenticatedApp = () => {
    // 设置当前登录状态 false
    const [isRegister,setIsRegister] = useState(false)
    return <div>
        {/* 判断登录状态 */}
        {
            isRegister ? <RegisterScreen /> : <LoginScreen />
        }
        <button onClick={()=>setIsRegister(!isRegister)}> 切换到{isRegister?'登录':'注册'}</button>
    </div>
}