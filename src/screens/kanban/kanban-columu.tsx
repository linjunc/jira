import { Kanban } from "types/kanban";
import { useTasks } from '../../utils/task';
import { useTasksSearchParams } from './util';
import { useTaskTypes } from '../../utils/task-type';
// 引入图片资源
import taskIcon from 'assets/task.svg'
import bugIcon from 'assets/bug.svg'
// 通过type渲染图片
const TaskTypeIcon = ({ id }: { id: number }) => {
    const { data: taskTypes } = useTaskTypes()
    const name = taskTypes?.find(taskType => taskType.id === id)?.name;
    if (!name) {
        return null
    }
    return <img src={name === 'task' ? taskIcon : bugIcon } />
}
  
export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
    const { data: allTasks } = useTasks(useTasksSearchParams())
    const tasks = allTasks?.filter(task => task.kanbanId === kanban.id)
    return <div>
        <h3>{kanban.name} </h3>
        {
            tasks?.map(tasks => <div key={tasks.id}>
                {tasks.name}
                <TaskTypeIcon id={tasks.typeId} />
            </div>)
        }
    </div>
}