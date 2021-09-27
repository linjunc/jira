import { QueryKey, useMutation, useQuery } from "react-query"
import { useHttp } from "./http"
import { Kanban } from '../types/kanban';
import { useAddConfig } from "./use-optimistic-options";

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