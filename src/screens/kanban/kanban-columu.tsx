import { Kanban } from "types/kanban";
import { useTasks } from '../../utils/task';
import { useTasksSearchParams } from './util';
import { useTaskTypes } from '../../utils/task-type';
// 引入图片资源
import taskIcon from 'assets/task.svg'
import bugIcon from 'assets/bug.svg'
import styled from '@emotion/styled';
import { Card } from "antd";
// 通过type渲染图片
const TaskTypeIcon = ({ id }: { id: number }) => {
    const { data: taskTypes } = useTaskTypes()
    const name = taskTypes?.find(taskType => taskType.id === id)?.name;
    if (!name) {
        return null
    }
    return <img src={name === 'task' ? taskIcon : bugIcon} />
}

export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
    // 获取全部的任务数据
    const { data: allTasks } = useTasks(useTasksSearchParams())
    // 对数据进行分类，返回的是三段数据，都是数组
    // 通过typeId来判断是什么类型
    const tasks = allTasks?.filter(task => task.kanbanId === kanban.id)
    return <Container>
        <h3>{kanban.name} </h3>
        <TasksContainer>
            {
                tasks?.map(tasks => <Card style={{ marginBottom: '0.5rem' }} key={tasks.id}>
                    <div>
                        {tasks.name}
                    </div>
                    <TaskTypeIcon id={tasks.typeId} />
                </Card>)
            }
        </TasksContainer>
    </Container>
}
const Container = styled.div`
    min-width: 27rem;
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