import { QueryKey, useMutation, useQuery } from "react-query"
import { useHttp } from "./http"
import { Kanban } from '../types/kanban';
import { useAddConfig, useDeleteConfig, useReorderKanbanConfig } from './use-optimistic-options';

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
        useReorderKanbanConfig(queryKey)
    )
}