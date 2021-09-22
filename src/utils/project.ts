
import { useEffect } from "react"
import { cleanObject } from "utils"
import { useHttp } from "./http"
import { useAsync } from "./use-Async"
// 引入有问题
import {Project} from 'screens/project-list/list'

export const useProjects = (param?: Partial<Project>) => {
    // 引入一个自定义的 http hook
    const client = useHttp()
    const { run, ...result } = useAsync<Project[]>()
    // 监听 param 变化
    useEffect(() => {
        // 获取假数据 成功 ok 返回 true
        // 采用 qs 来解析 get 请求参数
        // run函数需要传入一个 promise 对象
        run(client('projects', { data: cleanObject(param || {}) }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param])
    return result
}
