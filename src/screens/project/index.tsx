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
                <Navigate to={window.location.pathname + '/kanban'} />
            </Routes>

    </div>)
}