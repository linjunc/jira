import { useProjectIdInUrl } from "screens/kanban/util"
// 返回数据的id
export const useEpicSearchParams = () => ({ projectId: useProjectIdInUrl() })
// 整合一个 数组，作为参数被调用
export const useEpicsQueryKey = () => ['epics', useEpicSearchParams()]