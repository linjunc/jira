import User from "../types/User";
import { useHttp } from './http';
import { useQuery } from "react-query";
// react-query
export const useUsers = (param?: Partial<User>) => {
    // 引入一个自定义的 http hook
    // 调用 useHttp 返回的是一个 fetch 的 promise 对象
    const client = useHttp()
    // 删除原先的 context 方式，改用 url-query 来实现
    // 当 param 变化的时候触发 useQuery 重新渲染，我们需要在第一个参数中传入一个数组，数组的第二位传入依赖
    // 当 param 变化时，会重新发送请求
    // 只用一行代码
    return useQuery<User[]>(['users', param], () => client('users', { data: param }))
}
// 原始方法
// export const useUsers = (param?: Partial<User>) => {
//     // 1. 引入发送http请求的hook
//     const client = useHttp()
//     const { run, ...result } = useAsync<User[]>()
//     useEffect(() => {
//         run(client("users", { data: cleanObject(param || {}) }))
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [param])
//     return result
// }