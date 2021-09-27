import { useLocation } from "react-router"
import { useProject } from "utils/project"

export const useProjectIdInUrl = () => {
    const { pathname } = useLocation()
    // 返回的是一个数组
    const id = pathname.match(/projects\/(\d+)/)?.[1]
    return Number(id)
}
export const useProjectInUrl = () => useProject(useProjectIdInUrl())
export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() })
export const useKanbansQueryKey = () => ['kanbans', useKanbanSearchParams()]
export const useTasksSearchParams = () => ({ projectId: useProjectIdInUrl() })
export const useTasksQueryKey = () => ['tasks', useTasksSearchParams()]