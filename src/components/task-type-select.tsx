// 抽象一个 userSelect 组件，用于组件复用
import { IdSelect } from './id-select';
import { useTaskTypes } from '../utils/task-type';

export const TaskTypeSelect = (props: React.ComponentProps<typeof IdSelect>) => {
    // 获取task类型
    const { data: taskTypes } = useTaskTypes()
    return <IdSelect options={taskTypes || []} {...props}></IdSelect>
}