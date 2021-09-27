
import { useCallback, useEffect } from "react"
import { cleanObject } from "utils"
import { useHttp } from "./http"
import { useAsync } from "./use-Async"
import { Project } from '../types/project'
import { useMutation, useQuery, useQueryClient, QueryKey, Query } from 'react-query';
import { useProjectsSearchParams } from '../screens/project-list/util';
import { useEditConfig, useAddConfig, useDeleteConfig } from './use-optimistic-options';

export const useProjects = (param?: Partial<Project>) => {
    // 引入一个自定义的 http hook
    // 调用 useHttp 返回的是一个 fetch 的 promise 对象
    const client = useHttp()
    // 删除原先的 context 方式，改用 url-query 来实现
    // 当 param 变化的时候触发 useQuery 重新渲染，我们需要在第一个参数中传入一个数组，数组的第二位传入依赖
    // 当 param 变化时，会重新发送请求
    // 只用一行代码
    return useQuery<Project[]>(['projects', param], () => client('projects', { data: param }))
}
//  处理收藏的请求
// 由于 hook 只能在最顶部调用，不能在组件内部调用，因此这里不能传递参数
// 这个函数无限循环了
export const useEditProject = (queryKey: QueryKey) => {
    // 引入两个方法
    // 这里暴露其他的属性，供后面的使用
    const client = useHttp()
    // 为了解耦这里不传递
    // const queryKey = ['projects',useProjectsSearchParams()]
    // 问题根源在这 9.26，获取searchparam
    // const [searchParams] = useProjectsSearchParams()
    // 无限循环
    // const queryKey = ['projects', searchParams]
    // 实现乐观更新
    return useMutation(
        (params: Partial<Project>) => client(`projects/${params.id}`, {
            method: "PATCH",
            data: params
        }),
        useEditConfig(queryKey)
        // 第二个参数设置刷新
        // onSuccess: () => queryClient.invalidateQueries('projects'),
        // async onMutate(target) {
        //     // 数据列表
        //     const previousItems = queryClient.getQueryData(queryKey)
        //     queryClient.setQueryData(queryKey, (old?: Project[]) => {
        //         return old?.map(project => project.id === target.id ? { ...project, ...target } : project) || []
        //     })
        //     return { previousItems }
        // },
        // onError(error, newItem, context) {
        //     queryClient.setQueryData(queryKey, (context as { previousItems: Project[] }).previousItems)
        // }

    )
}
// 处理添加请求
export const useAddProject = (queryKey: QueryKey) => {
    // 引入两个方法
    // 这里暴露其他的属性，供后面的使用
    const client = useHttp()
    return useMutation(
        (params: Partial<Project>) => client(`projects`, {
            method: "POST",
            data: params
        }),
        useAddConfig(queryKey)
    )
}
// 获取项目详情
export const useProject = (id?: number) => {
    const client = useHttp()
    // 第三个参数为配置参数，用来规定一些东西，比如这里就规定了 enable 用来指定 id 必传
    return useQuery<Project>(
        ['project', { id }],
        () => client(`projects/${id}`),
        {
            enabled: Boolean(id)
        }
    )
}
export const useDeleteProject = (queryKey: QueryKey) => {
    const client = useHttp()
    return useMutation(
        // 这里我没有出现问题，视频出现了问题
        // 直接（id:number)
        ({ id }: { id: number }) => client(`projects/${id}`, {
            method: "DELETE",
        }),
        useDeleteConfig(queryKey)
    )
}