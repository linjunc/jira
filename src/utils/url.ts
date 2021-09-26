//实现了单页面应用中请求地址改变的问题

import { useMemo } from "react"
import { URLSearchParamsInit, useSearchParams } from "react-router-dom"
import { cleanObject } from './index';

// 返回页面 url 中的 query
// 设置一个泛型 K 用来接收传入的参数类型
// 对于泛型的理解，我们这里接收的参数的形参叫做 keys，它的类型是一个 K[],
//  当我们传入值是，那个值的值会作为 参数 keys 传入，类型会作为 K[]被接收
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
    // 定义了一些实用的方法来处理 URL 的查询字符串
    const [searchParams, setSearchParams] = useSearchParams()
    // 返回一个数组，第一个是 值，第二个是改变值得方法，相当于这里重写了一个 useState
    return [
        // 会创建新的对象 
        // 采用 useMemo 只有在依赖项改变时才会调用回调
        useMemo(
            () => keys.reduce((prev, key) => {
                // 解决当get 的值是null 时的默认值
                return { ...prev, [key]: searchParams.get(key) || '' }
                // 传入的是一个 key 类型在 K 中值为 string 的对象
            }, {} as { [key in K]: string }),
            
            [keys, searchParams]
        ),
        // 键值限定在我们设置的范围之内
        (params: Partial<{ [key in K]: unknown }>) => {
            // 把 fromEntries 转化为一个对象
            const o = cleanObject({ ...Object.fromEntries(searchParams), ...params }) as URLSearchParamsInit
            return setSearchParams(o)
        }
    ] as const
}