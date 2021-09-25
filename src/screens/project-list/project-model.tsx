import { Button, Drawer } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { projectListActions, selectProjectModelOpen } from './project-list.slice';
// 这是一个编辑框的页面，也就是点击创建项目啥的会弹出来的页面
// 新增模块
export const ProjectModel = () => {
    const dispatch = useDispatch()
    // 获取值
    const projectModelOpen = useSelector(selectProjectModelOpen)
    return (
        <Drawer
            onClose={() => dispatch(projectListActions.closeProjectModel())}
            visible={projectModelOpen}
            width={'100%'} >
            <h1>Project Model</h1>
            <Button onClick={() => dispatch(projectListActions.closeProjectModel())}>关闭</Button>
        </Drawer>
    )
}