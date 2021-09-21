// 已经登录的页面
import React from "react";
import { ProjectListScreen } from './screens/project-list/index';
import { useAuth } from './context/auth-context';
import { Button, PageHeader } from "antd";
import styled from "@emotion/styled";
export const AuthenticatedApp = () => {
    const { logout } = useAuth()
    return <Container>
        <Header>
            <HeaderLeft>
                <h3>Logo</h3>
                <h3>项目</h3>
                <h3>用户</h3>
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
const Header = styled.header`
    /* grid-area: header; */
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`
const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
`
const HeaderRight = styled.div`
`
const Main = styled.main`
/* grid-area:main; */
`