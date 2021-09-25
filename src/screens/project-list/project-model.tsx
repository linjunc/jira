import { Button, Drawer } from "antd"
import { useProjectModel } from './util';
// 这是一个编辑框的页面，也就是点击创建项目啥的会弹出来的页面
// 新增模块
export const ProjectModel = () => {
    const { projectModelOpen, close } = useProjectModel()
    return (
        <Drawer
            onClose={close}
            visible={projectModelOpen}
            width={'100%'} >
            <h1>Project Model</h1>
            <Button onClick={close}>关闭</Button>
        </Drawer>
    )
}