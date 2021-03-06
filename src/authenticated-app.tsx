// 已经登录的页面
import { Button, Dropdown, Menu } from "antd";
import styled from "@emotion/styled";
import { Navigate, Route, Routes } from 'react-router';
import { BrowserRouter as Router } from "react-router-dom";
import { ProjectListScreen } from './screens/project-list/index';
import { useAuth } from './context/auth-context';
import { ButtonNoPadding, Row } from './components/lib';
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
import { ProjectScreen } from "screens/project";
import { resetRoute } from "utils";
import { ProjectModel } from './screens/project-list/project-model';
import { ProjectPopover } from './components/project-popover';
import { UserPopover } from './components/user-popover';
export const AuthenticatedApp = () => {
    return <Container>
        {/* 迁移router位置，包裹全部内容 */}
        <Router>
            {/* 弄成组件 */}
            <PageHeader />
            {/* <Button onClick={() => setProjectModelOpen(true)}>打开</Button> */}
            {/* 人员项目列表 */}
            <Main>
                {/* <ProjectListScreen /> */}
                {/* 采用路由 */}
                <Routes>
                    {/* <Route path={'/'} element={<ProjectListScreen />}></Route> */}
                    <Route path={'/projects'} element={<ProjectListScreen />}></Route>
                    <Route path={'/projects/:projectId/*'} element={<ProjectScreen />}></Route>
                    {/* 艹，不要安装6 beta4 */}
                    <Navigate to={"/projects"} />
                </Routes>
            </Main>
            {/* 由于我们在路由Router 之外用了useProjectModel，它又用到了useUrlQueryParam，因此使用到了路由内容，会报错提示usehistory... */}
            <ProjectModel />
        </Router>
    </Container>
}
// 采用 router 来实现
const PageHeader = () => {
    return <Header between={true}>
        <HeaderLeft gap={true}>
            <ButtonNoPadding type={'link'} onClick={resetRoute}>
                <SoftwareLogo width={'18rem'} color={'rgb(38,132,255)'} />
            </ButtonNoPadding>
            {/* 收藏项目 */}
            <ProjectPopover />
            {/* 用户列表 */}
            <UserPopover />
        </HeaderLeft>
        <HeaderRight>
            <User />
        </HeaderRight>
    </Header>
}
const User = () => {
    const { logout, user } = useAuth()
    return <Dropdown overlay={<Menu>
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
}
// 采用 grid 布局 上下分隔
// 我们将样式写在最下面，竟然不会报错，这是因为暂时性死区，我们在见到这些组件时，只是声明，还没有使用因此不会出错
const Container = styled.div`
    display: grid;
    grid-template-rows: 6rem 1fr 6rem;
    /* grid-template-columns: 20rem 1fr 20rem; */
    height: 100vh;
`
const Header = styled(Row)`
    padding: 3.2rem;
    box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
    z-index:1;
`
const HeaderLeft = styled(Row)``
const HeaderRight = styled.div`
`
// 这里不加项目列表无法列内滚动
const Main = styled.main`
    display: flex;
    overflow: hidden;
`