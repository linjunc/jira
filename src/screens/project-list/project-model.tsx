import { Button, Drawer } from "antd"
// 这是一个编辑框的页面，也就是点击创建项目啥的会弹出来的页面
// 新增模块
export const ProjectModel = (props: { projectModelOpen: boolean,onClose: () => void }) => {
    return <Drawer onClose={props.onClose} visible={props.projectModelOpen} width={'100%'} >
        <h1>Project Model</h1>
        <Button onClick={props.onClose}>关闭</Button>
    </Drawer>
} 