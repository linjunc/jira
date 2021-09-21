// 已经登录的页面
import React from "react";
import { ProjectListScreen } from './screens/project-list/index';
import { useAuth } from './context/auth-context';
import { Button, PageHeader } from "antd";
import styled from "@emotion/styled";
import { Row } from './components/lib';
export const AuthenticatedApp = () => {
    const { logout } = useAuth()
    return <Container>
        <Header between={true}>
            <HeaderLeft gap={true}>
                <h2>Logo</h2>
                <h2>项目</h2>
                <h2>用户</h2>
            </HeaderLeft>
            <HeaderRight>
                <Button onClick={logout}>登出</Button>
            </HeaderRight>
        </Header>
        {/* 人员项目列表 */}
        <Main>
            <ProjectListScreen />
        </Main>
    </Container>
}

// 采用 grid 布局 上下分隔
const Container = styled.div`
    display: grid;
    grid-template-rows: 6rem 1fr 6rem;
    /* grid-template-columns: 20rem 1fr 20rem; */
    height: 100vh;
`
const Header = styled(Row)``
const HeaderLeft = styled(Row)``
const HeaderRight = styled.div`
`
const Main = styled.main`
/* grid-area:main; */
`