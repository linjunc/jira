// reducer 做状态管理的demo
import { useCallback, useReducer } from 'react';
// 定义 constant 定量
const UNDO = 'UNDO'
const REDO = 'REDO'
const SET = 'SET'
const RESET = 'RESET'

// 定义一个常用的类型
type State<T> = {
    past: T[],
    present: T,
    future: T[]
}
type Action<T> = {
    newPresent?: T,
    type: typeof UNDO | typeof REDO | typeof SET | typeof RESET
}
// reducer
const undoReducer = <T>(state: State<T>, action: Action<T>) => {
    const { past, present, future } = state
    const { type, newPresent } = action
    switch (type) {
        case UNDO: {
            if (past.length === 0) return state
            // 找到最新的那个数据
            const previous = past[past.length - 1]
            // 取出最后一个
            const newPast = past.slice(0, past.length - 1)
            return {
                past: newPast,
                present: previous,
                future: [present, ...future]
            }
        }
        case REDO: {
            if (future.length === 0) return state
            const next = future[0]
            // 取第一个
            const newFuture = future.slice(1)
            return {
                past: [...past, present],
                present: next,
                future: newFuture
            }
        }
        case SET: {
            if (newPresent === present) {
                return state
            }
            return {
                past: [...past, present],
                present: newPresent,
                future: []
            }
        }
        case RESET: {
            return {
                past: [],
                present: newPresent,
                future: []
            }
        }
    }
    return state
}
export const useUndo = <T>(initialPresent: T) => {
    const [state, dispatch] = useReducer(undoReducer, {
        past: [],
        present: initialPresent,
        future: []
    } as State<T>)
    const canUndo = state.past.length !== 0
    // 有future 才可以往前跳
    const canRedo = state.future.length !== 0
    // 这里我们返回了函数，所以最好使用 useCallback
    // 采用 reducer 进行状态管理
    const undo = useCallback(() => dispatch({ type: UNDO }), [])
    const redo = useCallback(() => dispatch({ type: REDO }), [])
    const set = useCallback((newPresent: T) => dispatch({ type: SET, newPresent }), [])
    const reset = useCallback((newPresent: T) => dispatch({ type: RESET, newPresent }), [])
    return [
        state,
        { set, reset, undo, redo, canUndo, canRedo }
    ] as const
}