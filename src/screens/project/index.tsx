import { Link } from 'react-router-dom'
import { Navigate,Route, Routes } from 'react-router';
import { KanbanScreen } from 'screens/kanban';
import { EpicScreen } from 'screens/epic';
export const ProjectScreen = () => {
    return (<div>
        <h1>project页面</h1>
        <Link to={'kanban'}>看板</Link>
        <Link to={'epic'}>任务组</Link>
            <Routes>
                <Route path={'/kanban'} element={<KanbanScreen />} />
                <Route path={'/epic'} element={<EpicScreen />} />
                {/* 默认路由是push，相当于又成为了栈顶，也就是当前页面被push了两次，第一次的值不匹配第二次才匹配 */}
                {/* 采用replace这样就能替换掉传入的栈顶元素，下面的路由成为了栈顶*/}
                <Navigate to={window.location.pathname + '/kanban'} replace={true} />
            </Routes>

    </div>)
}