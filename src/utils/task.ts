import { QueryKey, useMutation, useQuery } from "react-query"
import { useHttp } from "./http"
import { Task } from '../types/task';
import { useAddConfig } from "./use-optimistic-options";

export const useTasks = (param?: Partial<Task>) => {
    const client = useHttp()
    // 搜索框请求在这里触发
    return useQuery<Task[]>(['tasks', param], () => client('tasks', { data: param }))
}
// 处理添加请求
export const useAddTask = (queryKey: QueryKey) => {
    // 引入两个方法
    // 这里暴露其他的属性，供后面的使用
    const client = useHttp()
    return useMutation(
        (params: Partial<Task>) => client(`tasks`, {
            method: "POST",
            data: params
        }),
        useAddConfig(queryKey)
    )
}