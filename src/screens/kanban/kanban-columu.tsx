import { Kanban } from "types/kanban";
import { useTasks } from '../../utils/task';
import { useTasksSearchParams } from './util';

// const TaskTypeIcon  

export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
    const { data: allTasks } = useTasks(useTasksSearchParams())
    const tasks = allTasks?.filter(task => task.kanbanId === kanban.id)
    return <div>
        <h3>{kanban.name} </h3>
        {
            tasks?.map(tasks => <div key={tasks.id}>
                {tasks.name}
            </div>)
        }
    </div>
}