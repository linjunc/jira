import { useMemo } from "react"
import { useUrlQueryParam } from "utils/url"

export const useProjectsSearchParams = () => {
    // 要搜索的数据
    // 返回的是一个新的对象，造成地址不断改变，不断的渲染
    // 用这个方法来设置路由地址跟随输入框变化
    // 服务器返回的都是 string 类型
    const [param, setParam] = useUrlQueryParam(['name', 'personId'])
    return [
        // 采用 useMemo 解决 重复调用的问题
        useMemo(() => ({ ...param, personId: Number(param.personId) || undefined }), [param]),
        setParam
    ] as const
}
// 采用 url 进行状态管理
export const useProjectModel = () => {
    const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
        'projectCreate'
    ])
    const open = () => setProjectCreate({ projectCreate: true })
    const close = () => setProjectCreate({ projectCreate: undefined })
    return {
        projectModelOpen: projectCreate === 'true',
        open,
        close
    }
}