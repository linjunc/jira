
import { useCallback, useEffect } from "react"
import { cleanObject } from "utils"
import { useHttp } from "./http"
import { useAsync } from "./use-Async"
import { Project } from 'screens/project-list/list'
import { useMutation, useQuery, useQueryClient } from 'react-query';

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
export const useEditProject = () => {
    // 引入两个方法
    // 这里暴露其他的属性，供后面的使用
    const client = useHttp()
    const queryClient = useQueryClient()
    return useMutation(
        (params: Partial<Project>) => client(`projects/${params.id}`, {
            method: "PATCH",
            data: params
        }), { // 第二个参数设置刷新
        onSuccess: () => queryClient.invalidateQueries('projects')
    }
    )
}
// 处理添加请求
export const useAddProject = () => {
    // 引入两个方法
    // 这里暴露其他的属性，供后面的使用
    const client = useHttp()
    const queryClient = useQueryClient()
    return useMutation(
        (params: Partial<Project>) => client(`projects`, {
            method: "POST",
            data: params
        }), { // 第二个参数设置刷新
        onSuccess: () => queryClient.invalidateQueries('projects')
    }
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
export const useDeleteProject = () => {

}