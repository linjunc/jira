import { QueryKey, useMutation, useQuery } from "react-query"
import { useHttp } from "./http"
import { Task } from '../types/task';
import { useAddConfig, useDeleteConfig, useEditConfig, useReorderTaskConfig } from './use-optimistic-options';
import { SortProps } from "./kanban";

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

// 获取Task详情
export const useTask = (id?: number) => {
    const client = useHttp()
    // 第三个参数为配置参数，用来规定一些东西，比如这里就规定了 enable 用来指定 id 必传
    return useQuery<Task>(
        ['tasks', { id }],
        () => client(`tasks/${id}`),
        {
            enabled: Boolean(id)
        }
    )
}
// 编辑 Task

export const useEditTask = (queryKey: QueryKey) => {
    const client = useHttp()
    return useMutation(
        (params: Partial<Task>) => client(`tasks/${params.id}`, {
            method: "PATCH",
            data: params
        }),
        useEditConfig(queryKey)
    )
}

// 删除看板
export const useDeleteKanban = (queryKey: QueryKey) => {
    const client = useHttp()
    return useMutation(
        // 这里我没有出现问题，视频出现了问题
        // 直接（id:number)
        ({ id }: { id: number }) => client(`kanbans/${id}`, {
            method: "DELETE",
        }),
        useDeleteConfig(queryKey)
    )
}
// 删除任务
export const useDeleteTask = (queryKey: QueryKey) => {
    const client = useHttp()
    return useMutation(
        // 这里我没有出现问题，视频出现了问题
        // 直接（id:number)
        ({ id }: { id: number }) => client(`tasks/${id}`, {
            method: "DELETE",
        }),
        useDeleteConfig(queryKey)
    )
}

// 用于数据持久化的接口
export const useReorderTask = (queryKey:QueryKey) => {
    const client = useHttp()
    return useMutation(
        (params: SortProps) => {
            return client('tasks/reorder', {
                data: params,
                method: "POST"
            })
        },
        useReorderTaskConfig(queryKey)
    )
}