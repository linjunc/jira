import { useMemo } from "react"
import { useUrlQueryParam } from "utils/url"
import { useProject } from '../../utils/project';

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
// 采用 url 进行状态管理，感觉这种方法是最好的，通过暴露这几个方法，实际上调用的还是  setProjectCreate 方法，通过这个方法创建 url 显示在路径中
export const useProjectModel = () => {
    // 判断当前是不是在创建,在这个方法中，相当于重写了封装了修改url的方法，通过传入的值来设置查询字符串的key
    // 通过 set... 来控制 url 的值
    const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
        'projectCreate'
    ])
    // 判断当前是不是在编辑，解构出当前编辑项目的 id
    const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
        'editingProjectId'
    ])
    const { data: editingProject, isLoading } = useProject(Number(editingProjectId))
    const open = () => setProjectCreate({ projectCreate: true })
    const startEdit = (id: number) => setEditingProjectId({ editingProjectId: id })
    const close = () => {
        setEditingProjectId({ editingProjectId: undefined });
        setProjectCreate({ projectCreate: undefined });
    }
    return {
        projectModelOpen: projectCreate === 'true' || Boolean(editingProjectId),
        open,
        close,
        startEdit,
        editingProject,
        isLoading
    }
}