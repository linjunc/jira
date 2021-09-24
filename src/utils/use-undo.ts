import { useState, useCallback } from 'react';
export const useUndo = <T>(initialPresent: T) => {
    // // 保存历史记录
    // const [past, setPast] = useState<T[]>([])
    // const [present, setPresent] = useState(initialPresent)
    // const [future, setFuture] = useState<T[]>([])
    // 通过这种方式减少复杂度，太多的状态会难以维护
    const [state, setState] = useState<{
        past: T[],
        present: T,
        future: T[]
    }>({
        past: [],
        present: initialPresent,
        future: []
    })
    const canUndo = state.past.length !== 0
    // 有future 才可以往前跳
    const canRedo = state.future.length !== 0
    // 回退
    const undo = useCallback(() => {
        // 采用函数形式，当前的 currentState 是当前的 state
        setState(currentState => {
            const { past, present, future } = currentState
            if (past.length === 0) return currentState
            // 找到最新的那个数据
            const previous = past[past.length - 1]
            // 取出最后一个
            const newPast = past.slice(0, past.length - 1)
            return {
                past: newPast,
                present: previous,
                future: [present, ...future]
            }
            // newPast中不包含最新的那个结果 回到过去一个
            // setPast(newPast)
            // // 前面的列表就少了一个 ，把previous的值给现在显示的值
            // setPresent(previous)
            // // 那未来就多了一个,最新的在最前面
            // setFuture([previous, ...future])
        })
    }, [])
    // 前进
    const redo = useCallback(() => {
        setState(currentState => {
            const { past, present, future } = currentState
            if (future.length === 0) return currentState
            const next = future[0]
            // 取第一个
            const newFuture = future.slice(1)
            return {
                past: [...past, present],
                present: next,
                future: newFuture
            }
        })

    }, [])
    // 加一
    const set = useCallback((newPresent: T) => {
        setState(currentState => {
            const { past, present, future } = currentState
            if (newPresent === present) {
                return currentState
            }
            return {
                past: [...past, present],
                present: newPresent,
                future: []
            }
        })

    }, [])
    const reset = useCallback((newPresent: T) => {
        setState(() => {
            return {
                past: [],
                present: newPresent,
                future: []
            }
        })
    }, [])
    // 这里我们返回了函数，所以最好使用 useCallback
    return [
        state,
        { set, reset, undo, redo, canUndo, canRedo }
    ] as const
}