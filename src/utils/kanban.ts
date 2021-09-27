import { QueryKey, useMutation, useQuery } from "react-query"
import { useHttp } from "./http"
import { Kanban } from '../types/kanban';
import { useAddConfig, useReorderConfig } from './use-optimistic-options';

export const useKanbans = (param?: Partial<Kanban>) => {
    const client = useHttp()
    return useQuery<Kanban[]>(['kanbans', param], () => client('kanbans', { data: param }))
}
// 处理添加请求
export const useAddKanban = (queryKey: QueryKey) => {
    // 引入两个方法
    // 这里暴露其他的属性，供后面的使用
    const client = useHttp()
    return useMutation(
        (params: Partial<Kanban>) => client(`kanbans`, {
            method: "POST",
            data: params
        }),
        useAddConfig(queryKey)
    )
}
export interface SortProps {
    // 拿的项目的id
    fromId?: number;
    // 放在的位置
    referenceId?: number;
    // 在前面还是在后面
    type: 'before' | 'after';
    fromKanbanId?: number;
    toKanbanId?: number
}
// 持久化数据接口
export const useReorderKanban = (queryKey:QueryKey) => {
    const client = useHttp()
    return useMutation(
        (params: SortProps) => {
            return client('kanbans/reorder', {
                data: params,
                method: "POST"
            })
        },
        useReorderConfig(queryKey)
    )
}