import { useState, useCallback } from 'react';
export const useUndo = <T>(initialPresent: T) => {
    // 保存历史记录
    const [past, setPast] = useState<T[]>([])
    const [present, setPresent] = useState(initialPresent)
    const [future, setFuture] = useState<T[]>([])
    const canUndo = past.length !== 0
    // 有future 才可以往前跳
    const canRedo = future.length !== 0
    // 回退
    const undo = useCallback(() => {
        if (!canUndo) return
        // 找到最新的那个数据
        const previous = past[past.length - 1]
        // 取出最后一个
        const newPast = past.slice(0, past.length - 1)
        // newPast中不包含最新的那个结果 回到过去一个
        setPast(newPast)
        // 前面的列表就少了一个 ，把previous的值给现在显示的值
        setPresent(previous)
        // 那未来就多了一个,最新的在最前面
        setFuture([previous, ...future])
    }, [canUndo, future, past])
    // 前进
    const redo = useCallback(() => {
        if (!canRedo) return
        const next = future[0]
        // 取第一个
        const newFuture = future.slice(1)
        setPast([...past, present])
        setPresent(next)
        setFuture(newFuture)
    }, [canRedo, future, past, present])
    // 加一
    const set = useCallback((newPresent: T) => {
        if (newPresent === present) {
            return
        }
        setPast([...past, present])
        setPresent(newPresent)
        setFuture([])
    }, [past, present])
    const reset = useCallback((newPresent: T) => {
        setPast([])
        setPresent(newPresent)
        setFuture([])
    }, [])
    // 这里我们返回了函数，所以最好使用 useCallback
    return [
        { past, present, future },
        { set, reset, undo, redo, canUndo, canRedo }
    ] as const
}