import { Link } from 'react-router-dom'
import { Navigate, Route, Routes, useLocation } from 'react-router';
import { KanbanScreen } from 'screens/kanban';
import { EpicScreen } from 'screens/epic';
import styled from '@emotion/styled';
import { Menu } from 'antd';
// 定义一个简单的hook 来判断当前的路由
const useRouteType = () => {
    // 得到的是一个路由数据数组，通过 / 来分隔
    const units = useLocation().pathname.split('/')
    // 得到最后的值，用来判断是看板还是数组
    return units[units.length - 1]
}
export const ProjectScreen = () => {
    const routeType = useRouteType()
    return (<Container>
        <Aside>
            <Menu mode={'inline'} selectedKeys={[routeType]}>
                <Menu.Item key={'kanban'}>
                    <Link to={'kanban'}>看板</Link>
                </Menu.Item>
                <Menu.Item key={'epic'}>
                    <Link to={'epic'}>任务组</Link>
                </Menu.Item>
            </Menu>
        </Aside>
        <Main>
            <Routes>
                <Route path={'/kanban'} element={<KanbanScreen />} />
                <Route path={'/epic'} element={<EpicScreen />} />
                {/* 默认路由是push，相当于又成为了栈顶，也就是当前页面被push了两次，第一次的值不匹配第二次才匹配 */}
                {/* 采用replace这样就能替换掉传入的栈顶元素，下面的路由成为了栈顶*/}
                <Navigate to={window.location.pathname + '/kanban'} replace={true} />
            </Routes>
        </Main>

    </Container>)
}
const Aside = styled.aside`
    background-color: rgb(244,245,247);
    display: flex;
`
const Main = styled.div`
    display: flex;
    box-shadow: -5px 0 -5px rgba(0,0,0,0.1);
    overflow: hidden;
`
// grid 布局，左边16rem，右边随意
const Container = styled.div`
    display: grid;
    grid-template-columns: 20rem 1fr;
    /* overflow: hidden; */
`