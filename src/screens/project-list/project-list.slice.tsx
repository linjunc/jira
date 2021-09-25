import { createSlice } from "@reduxjs/toolkit"
import { RootState } from '../../score/index';

// 用来管理project list 中的状态
interface State {
    projectModelOpen: boolean
}
const initialState: State = {
    projectModelOpen: false
}
export const ProjectListSlice = createSlice({
    name: 'projectListSlice',
    initialState,
    // 类似于 immer 能让我们用这种不干净的写法，完成干净的事，它内部帮我们返回了一个新对象
    // 不违反纯函数的原则
    reducers: {
        openProjectModel(state) {
            state.projectModelOpen = true
        },
        closeProjectModel(state) {
            state.projectModelOpen = false
        }
    }
})

// 导出 action
export const projectListActions = ProjectListSlice.actions
export const selectProjectModelOpen = (state: RootState) => state.projectList.projectModelOpen