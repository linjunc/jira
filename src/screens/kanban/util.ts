import { useLocation } from "react-router"
import { useProject } from "utils/project"
import { useUrlQueryParam } from '../../utils/url';
import { useMemo } from 'react';
import { Project } from '../../types/project';
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
export const useTasksSearchParams = () => {
    const [param, setParam] = useUrlQueryParam([
        'name',
        'typeId',
        'processorId',
        'tagId'
    ])
    // 获取当前的项目id用来获取看板数据
    const projectId = useProjectIdInUrl()
    return useMemo(() => ({
        projectId,
        typeId: Number(param.typeId) || undefined,
        processId: Number(param.processorId) || undefined,
        tagId: Number(param.tagId) || undefined,
        name: param.name
    }), [projectId, param])
}
export const useTasksQueryKey = () => ['tasks', useTasksSearchParams()]
