// 未登录页面
import { LoginScreen } from './login';
import { RegisterScreen } from './register';
import { useState } from 'react';
import { Button, Card, Divider } from 'antd';
import styled from '@emotion/styled'
// 引入本地资源
import logo from 'assets/logo.svg'
import left from 'assets/left.svg'
import right from 'assets/right.svg'

export const UnauthenticatedApp = () => {
    // 设置当前登录状态 false
    const [isRegister, setIsRegister] = useState(false)
    return <Container style={{ display: "flex", justifyContent: "center" }}>
        <Header />

        <Background />
        <ShadowCard>
            <Title>
                {
                    isRegister ? '请注册' : "请登录"
                }
            </Title>

            {/* 判断登录状态 */}
            {
                isRegister ? <RegisterScreen /> : <LoginScreen />
            }
            <Divider />
            <a onClick={() => setIsRegister(!isRegister)}>{isRegister ? '已经有账号了？直接登录' : '没有账号？注册新账号'}</a>
        </ShadowCard>

    </Container>
}
export const LongButton = styled(Button)`
    width: 100%;
`
const Title = styled.h2`
    margin-bottom: 2.4rem;
    color: rgb(94,108,132);
`
const Background = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: left bottom ,right bottom;
    background-size : calc(((100vw -40rem)/2) - 3.2rem), calc(((100vw -40rem)/2) - 3.2rem),cover;
    background-image: url(${left}), url(${right});
`
const Header = styled.header`
    background:url(${logo}) no-repeat center;
    padding: 5rem 0;
    background-size: 8rem;
    width: 100% ;
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
`
// 组件加样式，给Card组件更改样式
const ShadowCard = styled(Card)`
    width: 40rem;
    min-height: 56rem;
    padding: 3.2rem 4rem;
    box-shadow: rgba(0,0,0,0.1) 0 0 10px;
    text-align: center;
`