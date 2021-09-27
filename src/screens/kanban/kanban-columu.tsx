import { Kanban } from "types/kanban";
import { useTasks, useDeleteKanban } from '../../utils/task';
import { useTasksSearchParams, useTasksModel, useKanbansQueryKey } from './util';
import { useTaskTypes } from '../../utils/task-type';
// 引入图片资源
import taskIcon from 'assets/task.svg'
import bugIcon from 'assets/bug.svg'
import styled from '@emotion/styled';
import { Button, Card, Dropdown, Menu, Modal } from 'antd';
import { CreateTask } from "./create-task";
import { Mark } from "components/mark";
import { Task } from "types/task";
import { Row } from "components/lib";
// 通过type渲染图片
const TaskTypeIcon = ({ id }: { id: number }) => {
    const { data: taskTypes } = useTaskTypes()
    const name = taskTypes?.find(taskType => taskType.id === id)?.name;
    if (!name) {
        return null
    }
    return <img alt={'task-icon'} src={name === 'task' ? taskIcon : bugIcon} />
}
// 抽出一个 Card 组件，功能分离
const TaskCard = ({ task }: { task: Task }) => {
    const { startEdit } = useTasksModel()
    const { name: keyword } = useTasksSearchParams()
    return <Card onClick={() => startEdit(task.id)} style={{ marginBottom: '0.5rem', cursor: 'pointer' }} key={task.id}>
        <p><Mark keyword={keyword} name={task.name} ></Mark></p>
        <TaskTypeIcon id={task.typeId} />
    </Card>
}
export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
    // 获取全部的任务数据，在这里获取数据，这个数据是动态的，根据url内容而定
    const { data: allTasks } = useTasks(useTasksSearchParams())
    // 对数据进行分类，返回的是三段数据，都是数组
    // 通过typeId来判断是什么类型
    const tasks = allTasks?.filter(task => task.kanbanId === kanban.id)
    return <Container>
        <Row between={true}>
            <h3>{kanban.name} </h3>
            <More kanban={kanban} />
        </Row>

        <TasksContainer>
            {
                tasks?.map(task => <TaskCard task={task} />)
            }
            <CreateTask kanbanId={kanban.id} />
        </TasksContainer>
    </Container>
}
const More = ({ kanban }: { kanban: Kanban }) => {
    const { mutateAsync, } = useDeleteKanban(useKanbansQueryKey())
    const startEdit = () => {
        Modal.confirm({
            okText: '确定',
            cancelText: '取消',
            title: '你确定删除看板吗？',
            onOk() {
                return mutateAsync({ id: kanban.id })
            }
        })
    }
    const overlay = <Menu>
        <Menu.Item>
            <Button type={'link'} onClick={startEdit}>删除</Button>
        </Menu.Item>
    </Menu>
    return <Dropdown overlay={overlay}>
        <Button type={'link'}>...</Button>
    </Dropdown>
}
export const Container = styled.div`
    min-width: 27rem;
    /* min-height: 35rem; */
    border-radius: 6px;
    background-color: rgb(244,245,247);
    display: flex;
    flex-direction: column;
    padding: 0.7rem 0.7rem 1rem;
    margin-right:1.5rem;
`
const TasksContainer = styled.div`
    overflow: scroll;
    flex: 1;
    ::-webkit-scrollbar {
        display: none;
    }
`