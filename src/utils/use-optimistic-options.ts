import { QueryKey, QueryClient, useQueryClient } from 'react-query';

// 乐观更新,用来生产代码的 hook
// 这里的类型非常的复杂采用了很多的any ，代价是可以接受的
export const useConfig = (queryKey: QueryKey, callback: (target: any, old?: any[]) => any[]) => {
    const queryClient = useQueryClient()
    return {
        onSuccess: () => queryClient.invalidateQueries(queryKey),
        async onMutate(target: any) {
            // 数据列表
            const previousItems = queryClient.getQueryData(queryKey)
            queryClient.setQueryData(queryKey, (old?: any[]) => {
                return callback(target, old)
            })
            return { previousItems }
        },
        onError(error: any, newItem: any, context: any) {
            queryClient.setQueryData(queryKey, context.previousItems)
        }
    }
}
export const useDeleteConfig = (queryKey: QueryKey) => useConfig(queryKey, (target, old) => old?.filter(item => item.id !== target.id) || [])
export const useEditConfig = (queryKey: QueryKey) => useConfig(queryKey, (target, old) => old?.map(item => item.id === target.id ? { ...item, ...target } : item) || [])
export const useAddConfig = (queryKey: QueryKey) => useConfig(queryKey, (target, old) => old ? [...old, target] : [])