// 一个处理异步请求的 hook
import { useCallback, useReducer, useState } from 'react';
import { useMountedRef } from 'utils';
import {} from 'redux'
// 一个 State 接口
interface State<D> {
    error: Error | null;
    // 返回的数据
    data: D | null;
    // 请求过程状态
    stat: 'idle' | 'loading' | 'error' | 'success'
}
// 初始状态
const defaultInitialState: State<null> = {
    stat: 'idle',
    data: null,
    error: null
}
// 默认配置方案
const defaultConfig = {
    throwOnError: false
}
// 用这个dispatch 会帮我们判断 mountedRef 组件是否被卸载
const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
    const mountedRef = useMountedRef()
    return useCallback((...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0), [dispatch, mountedRef])
}
// 自定义hook， initialState 接收用户传入的 state
// D 是传入的泛型
export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
    // 设置初始状态
    const config = { ...defaultConfig, initialConfig }
    const [state, dispatch] = useReducer((state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }), {
        // 默认值
        ...defaultInitialState,
        // 传入值
        ...initialState
    })
    const safeDispatch = useSafeDispatch(dispatch)
    // retry 状态控制，需要通过返回函数的方式来初始化，因为有惰性state
    const [retry, setRetry] = useState(() => () => { })
    // 正常响应时的数据处理
    const setData = useCallback((data: D) => safeDispatch({
        data,
        stat: 'success',
        error: null
    }), [safeDispatch])
    // 发生错误时的错误处理
    const setError = useCallback((error: Error) => safeDispatch({
        error,
        stat: 'error',
        data: null
    }), [safeDispatch])

    // run是主入口，触发异步请求
    // 采用useCallback,只有依赖中的数据发生变化的时候，run才会被重新定义
    const run = useCallback((promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
        // 如果传入的不是 promise，直接 throw
        if (!promise || !promise.then) {
            throw new Error('请传入 Promise 类型数据')
        }
        // 定义重新刷新一次，返回一个有上一次 run 执行时的函数
        setRetry(() => () => {
            if (runConfig?.retry) {
                run(runConfig?.retry(), runConfig)
            }
        })
        // 如果是 promise 则设置状态，开始 loading
        // 在这里 setState 会造成无限循环
        // 在 reducer 中会合并以前的状态和现在的状态
        safeDispatch({ stat: 'loading' })
        // 返回一个promise对象处理数据        
        return promise
            .then(data => {
                // 成功则处理stat
                // 判断组件状态
                setData(data)
                // throw new Error('222')
                return data
            }, async (err) => {
                console.log('失败');
                // 卧槽，尼玛的，解决了catch 获取不到错误的问题
                // 接收到扔来的错误，再扔一下
                return Promise.reject(await err)
                // throw Promise.reject(await err.then())
            })
            .catch(error => {
                // 错误抛出了，但是接不住
                setError(error)
                if (config.throwOnError) {
                    return Promise.reject(error)
                }
                return Promise.reject(error)
            })
    }, [config.throwOnError, safeDispatch, setData, setError])
    // 最终返回一大堆的数据接口
    return {
        // 请求状态
        isIdle: state.stat === 'idle', 
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        // run 接收一个promise 对象，返回执行结果
        run,
        setData,
        setError,
        // retry 被调用重新执行 run，让state 更新
        retry,
        ...state
    }
}