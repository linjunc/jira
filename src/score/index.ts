import { configureStore } from "@reduxjs/toolkit"
import { ProjectListSlice } from "screens/project-list/project-list.slice"
import { authSlice } from "./auth-slice"

// redux作为容器
export const rootReducer = {
    projectList: ProjectListSlice.reducer,
    auth: authSlice.reducer 
}
export const store = configureStore({
    reducer: rootReducer
})
// 暴露两个类型  
export type AppDispatch = typeof store.dispatch
// 返回的是函数的返回值的类型，typeof 把函数类型转化为ts类型，得到 S 的类型
export type RootState = ReturnType<typeof store.getState>