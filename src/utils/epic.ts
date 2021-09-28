import { QueryKey, useMutation, useQuery } from "react-query"
import { useHttp } from "./http"
import { Epic } from '../types/epic';
import { useAddConfig, useDeleteConfig } from "./use-optimistic-options";

export const useEpics = (param?: Partial<Epic>) => {
    const client = useHttp()
    return useQuery<Epic[]>(['epics', param], () => client('epics', { data: param }))
}
// 处理添加请求
export const useAddEpic = (queryKey: QueryKey) => {
    // 引入两个方法
    // 这里暴露其他的属性，供后面的使用
    const client = useHttp()
    return useMutation(
        (params: Partial<Epic>) => client(`epics`, {
            method: "POST",
            data: params
        }),
        useAddConfig(queryKey)
    )
}
// 删除看板
export const useDeleteEpic = (queryKey: QueryKey) => {
    const client = useHttp()
    return useMutation(
        // 这里我没有出现问题，视频出现了问题
        // 直接（id:number)
        ({ id }: { id: number }) => client(`epics/${id}`, {
            method: "DELETE",
        }),
        useDeleteConfig(queryKey)
    )
}