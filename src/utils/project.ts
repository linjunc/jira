
import { useEffect } from "react"
import { cleanObject } from "utils"
import { useHttp } from "./http"
import { useAsync } from "./use-Async"
import { Project } from 'screens/project-list/list'

export const useProjects = (param?: Partial<Project>) => {
    // 引入一个自定义的 http hook
    // 调用 useHttp 返回的是一个 fetch 的 promise 对象
    const client = useHttp()
    // 传入的 Project 是导入的一个接口
    const { run, ...result } = useAsync<Project[]>()
    // 提取请求，后面多次调用
    const fetchProjects = () => client('projects', { data: cleanObject(param || {}) })
    // 监听 param 变化
    useEffect(() => {
        // 获取假数据 成功 ok 返回 true
        // 采用 qs 来解析 get 请求参数
        // run 函数需要传入一个 promise 对象
        // client 接受一个 endpoint 请求地址，一个配置对象 config
        run(fetchProjects(), {
            retry: fetchProjects
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param])
    return result
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