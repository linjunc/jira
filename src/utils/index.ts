/*
 * @Author: 林俊丞
 * @Date: 2021-09-20 14:36:48
 * @LastEditors: 林俊丞
 * @LastEditTime: 2021-09-20 17:50:03
 * @Description: 
 */


import {
    useEffect,
    useState
} from "react"
// 改变对象本身是不好的
// 处理0的情况 !! 表示转换为 bool值

export const isFalsy = (value: unknown) => value === 0 ? false : !value
// 清除那些 value 值为空的键值对
// 如果函数里面没有用到 hook，我们可以不写成 hook，直接写函数就好了
export const cleanObject = (object: object) => {
    const result = {
        ...object
    }
    Object.keys(result).forEach(key => {
        const value = result[key]
        if (isFalsy(value)) {
            delete result[key]
        }
    })
    return result
}
// 只在组件挂载的时候调用，只执行一次
export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}
// 用于快速的操作，防抖，只执行最后一次
// custom hook

// 后面用泛型来解决
export const useDebounce = <V>(value:V, delay?: number):any => {
    // 设置一个 debouncedValue 值，用于暂存值，以及监控变化
    const [debouncedValue, setDebouncedValue] = useState(value)
    useEffect(() => {
        // 接收一个定时器，参数为一个函数和延时时间
        // 每次value变化，设置一个定时器
        const timeout = setTimeout(() => setDebouncedValue(value), delay)
        // 每次上一个useEffect 的定时器被清除，相当于上一个定时器被卸载了
        return () => clearTimeout(timeout)
        // 监听value 和 delay 变化，当参数变化时，重新调用这个函数设置定时器
    }, [value, delay])
    // 返回值
    return debouncedValue
}