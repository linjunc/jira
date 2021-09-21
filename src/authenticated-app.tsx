// 已经登录的页面
import React from "react";
import { ProjectListScreen } from './screens/project-list/index';
import { useAuth } from './context/auth-context';
import { Button, Dropdown, Menu } from "antd";
import styled from "@emotion/styled";
import { Row } from './components/lib';
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
export const AuthenticatedApp = () => {
    const { logout, user } = useAuth()
    return <Container>
        <Header between={true}>
            <HeaderLeft gap={true}>
                <SoftwareLogo width={'18rem'} color={'rgb(38,132,255)'} />
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