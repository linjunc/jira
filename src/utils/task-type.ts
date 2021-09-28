// 获取数据列表
import { useQuery } from "react-query"
import { useHttp } from "./http"
import { TaskType } from '../types/task-type';

export const useTaskTypes = () => {
    const client = useHttp()
    // 获取所有的task type
    return useQuery<TaskType[]>(['taskTypes'], () => client('taskTypes'))
}