// 一个处理异步请求的 hook
import { useState } from 'react';
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
// 自定义hook， initialState 接收用户传入的 state
// D 是传入的泛型
export const useAsync = <D>(initialState?: State<D>) => {
    // 设置初始状态
    const [state, setState] = useState<State<D>>({
        // 默认值
        ...defaultInitialState,
        // 传入值
        ...initialState
    })
    // 正常响应时的数据处理
    const setData = (data: D) => setState({
        data,
        stat: 'success',
        error: null
    })
    // 发生错误时的错误处理
    const setError = (error: Error) => setState({
        error,
        stat: 'error',
        data: null
    })
    // run是主入口，触发异步请求
    const run = (promise: Promise<D>) => {
        // 如果传入的不是 promise，直接 throw
        if (!promise || !promise.then) {
            throw new Error('请传入 Promise 类型数据')
        }
        // 如果是promise 则设置状态，开始 loading
        setState({ ...state, stat: 'loading' })
        // 返回一个promise对象处理数据        
        return promise
            .then(data => {
                // 成功则处理stat
                setData(data)
                return data
            })
            .catch(error => {
                setError(error)
                return error
            })
    }
    // 最终返回一大堆的数据接口
    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        run,
        setData,
        setError,
        ...state
    }
}