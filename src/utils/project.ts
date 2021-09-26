
import { useCallback, useEffect } from "react"
import { cleanObject } from "utils"
import { useHttp } from "./http"
import { useAsync } from "./use-Async"
import { Project } from 'screens/project-list/list'
import { useQuery } from "react-query"

export const useProjects = (param?: Partial<Project>) => {
    // 引入一个自定义的 http hook
    // 调用 useHttp 返回的是一个 fetch 的 promise 对象
    const client = useHttp()
    // 删除原先的 context 方式，改用 url-query 来实现
    // 当 param 变化的时候触发 useQuery 重新渲染，我们需要在第一个参数中传入一个数组，数组的第二位传入依赖
    // 当 param 变化时，会重新发送请求
    // 只用一行代码
    return useQuery<Project[]>(['project', param], () => client('projects', { data: param }))
}
//  处理收藏的请求
// 由于 hook 只能在最顶部调用，不能在组件内部调用，因此这里不能传递参数
export const useEditProject = () => {
    // 引入两个方法
    // 这里暴露其他的属性，供后面的使用
    const { run, ...asyncResult } = useAsync()
    const client = useHttp()
    // 编写一个函数
    const mutate = (params: Partial<Project>) => {
        return run(client(`projects/${params.id}`, {
            data: params,
            method: "PATCH"
        }))
    }
    return {
        mutate,
        ...asyncResult
    }
}

export const useAddProject = () => {
    // 引入两个方法
    // 这里暴露其他的属性，供后面的使用
    const { run, ...asyncResult } = useAsync()
    const client = useHttp()
    // 编写一个函数
    const mutate = (params: Partial<Project>) => {
        run(client(`projects/${params.id}`, {
            data: params,
            method: "POST"
        }))
    }
    return {
        mutate,
        ...asyncResult
    }
}