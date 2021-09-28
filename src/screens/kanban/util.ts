import { useLocation } from "react-router"
import { useProject } from "utils/project"
import { useUrlQueryParam } from '../../utils/url';
import { useMemo, useCallback } from 'react';
import { useTask } from "utils/task";
// 防抖，这里使用会抽搐
// import { useDebounce } from '../../utils/index';
// 获取当前的项目id用来获取看板数据，返回id
export const useProjectIdInUrl = () => {
    const { pathname } = useLocation()
    // 返回的是一个数组
    const id = pathname.match(/projects\/(\d+)/)?.[1]
    return Number(id)
}
// 通过 id 获取项目信息
export const useProjectInUrl = () => useProject(useProjectIdInUrl())
// 看板搜索框的内容
export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() })
export const useKanbansQueryKey = () => ['kanbans', useKanbanSearchParams()]
// 任务搜索框数据
export const useTasksSearchParams = () => {
    // 搜索内容
    const [param] = useUrlQueryParam([
        'name',
        'typeId',
        'processorId',
        'tagId'
    ])
    // 获取当前的项目id用来获取看板数据
    const projectId = useProjectIdInUrl()
    // 用这个会抽搐
    // const debouncedName = useDebounce(param.name, 200)
    // 返回的数组，并监听 param变化，这个会是引起发送请求的根源吗
    return useMemo(() => ({
        projectId,
        typeId: Number(param.typeId) || undefined,
        processId: Number(param.processorId) || undefined,
        tagId: Number(param.tagId) || undefined,
        name: param.name
    }), [projectId, param])
}
// 在这里实现发送请求
export const useTasksQueryKey = () => ['tasks', useTasksSearchParams()]
// 看板任务的模态框
export const useTasksModel = () => {
    const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam(['editingTaskId'])
    const { data: editingTask, isLoading } = useTask(Number(editingTaskId))
    // 开启编辑,传入id，跟随id改变，url改变触发请求
    const startEdit = useCallback((id: number) => {
        setEditingTaskId({ editingTaskId: id })
    }, [setEditingTaskId])
    // 关闭模态框
    const close = useCallback(() => {
        setEditingTaskId({ editingTaskId: '' })
    }, [setEditingTaskId])
    // 暴露方法
    return {
        editingTaskId,
        editingTask,
        startEdit,
        close,
        isLoading
    }
}
