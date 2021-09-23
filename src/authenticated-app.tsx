// 已经登录的页面
import React from "react";
import { Button, Dropdown, Menu } from "antd";
import styled from "@emotion/styled";
import { Navigate, Route, Routes } from 'react-router';
import { BrowserRouter as Router } from "react-router-dom";
import { ProjectListScreen } from './screens/project-list/index';
import { useAuth } from './context/auth-context';
import { Row } from './components/lib';
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
import { ProjectScreen } from "screens/project";
import { resetRoute } from "utils";
export const AuthenticatedApp = () => {
    return <Container>
        {/* 弄成组件 */}
        <PageHeader />
        {/* 人员项目列表 */}
        <Main>
            {/* <ProjectListScreen /> */}
            {/* 采用路由 */}
            <Router>
                <Routes>
                    {/* <Route path={'/'} element={<ProjectListScreen />}></Route> */}
                    <Route path={'/projects'} element={<ProjectListScreen />}></Route>
                    <Route path={'/projects/:projectId/*'} element={<ProjectScreen />}></Route>
                    {/* 艹，不要安装 */}
                    <Navigate to={"/projects"} />
                </Routes>
            </Router>
        </Main>
    </Container>
} 
// 采用 router 来实现
const PageHeader = () => {
    const { logout, user } = useAuth()

    return <Header between={true}>
        <HeaderLeft gap={true}>
            <Button type={'link'} onClick={resetRoute}>
            <SoftwareLogo width={'18rem'} color={'rgb(38,132,255)'} />
            </Button>
            <h2>项目</h2>
            <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
            <Dropdown overlay={<Menu>
                <Menu.Item key={'logout'}>
                    <Button type={"link"} onClick={logout}>登出</Button>
                </Menu.Item>
            </Menu>}>
                <Button
                    onClick={e => e.preventDefault()}
                    type={'link'}>
                    Hi,{user?.name}
                </Button>
            </Dropdown>
        </HeaderRight>
    </Header>
}
// 采用 grid 布局 上下分隔
const Container = styled.div`
    display: grid;
    grid-template-rows: 6rem 1fr 6rem;
    /* grid-template-columns: 20rem 1fr 20rem; */
    height: 100vh;
`
const Header = styled(Row)`
    padding: 3.2rem;
    box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
    /* z-index:1; */
`
const HeaderLeft = styled(Row)``
const HeaderRight = styled.div`
`
const Main = styled.main`
/* grid-area:main; */
`