import { Button, List, Modal } from "antd";
import { ScreenContainer } from "components/lib"
import { useProjectInUrl } from "screens/kanban/util"
import { useDeleteEpic, useEpics } from '../../utils/epic';
import { useEpicSearchParams, useEpicsQueryKey } from './util';
import { Row } from '../../components/lib';
import dayjs from 'dayjs';
import { useTasks } from '../../utils/task';
import { Link } from "react-router-dom";
import { CreateEpic } from './create-epic';
import { type } from "os";
import { useState } from "react";
import { Epic } from "types/epic";

export const EpicScreen = () => {
    const { data: currentProject } = useProjectInUrl()
    // 关于任务的信息
    const { data: epics } = useEpics(useEpicSearchParams())
    // 获取任务组中的任务列表
    const { data: tasks } = useTasks({ projectId: currentProject?.id })
    // 获取删除的函数
    const { mutate: deleteEpic } = useDeleteEpic(useEpicsQueryKey())
    // 创建任务模态框的控制
    const [epicCreateOpen, setEpicCreateOpen] = useState(false)
    // 删除时的提示框
    const confirmDeleteEpic = (epic: Epic) => {
        Modal.confirm({
            title: `你确定删除项目组${epic.name}吗？`,
            content: '点击确定删除',
            okText: '确定',
            onOk() {
                // 确认时调用删除
                deleteEpic({ id: epic.id })
            }
        })
    }
    return <ScreenContainer>
        <Row between={true}>
            <h1>{currentProject?.name}任务组</h1>
            <Button onClick={() => setEpicCreateOpen(true)} >创建任务组</Button>
        </Row>

        <List style={{ overflowY: 'scroll' }} dataSource={epics} itemLayout={'vertical'} renderItem={epic => <List.Item>
            {/* meta 配置 item */}
            <List.Item.Meta title={<Row between={true}>
                <span>{epic.name}</span>
                <Button onClick={() => { confirmDeleteEpic(epic) }} type={"link"}>删除</Button>
            </Row>}
                description={<div>
                    <div>开始时间：{dayjs(epic.start).format("YYYY-MM-DD")}</div>
                    <div>结束时间：{dayjs(epic.end).format("YYYY-MM-DD")}</div>
                </div>}
            />
            <div>
                {
                    tasks?.filter(task => task.epicId === epic.id)
                        .map(task => <Link
                            style={{ marginRight: '20px' }}
                            key={task.id}
                            // 链接到看板页面
                            to={`/projects/${currentProject?.id}/kanban?editingTaskId=${task.id}`}>
                            {task.name}
                        </Link>)
                }
            </div>
        </List.Item>} />
        <CreateEpic onClose={() => setEpicCreateOpen(false)} visible={epicCreateOpen} />
    </ScreenContainer >

}