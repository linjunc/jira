import { Project } from 'screens/project-list/list';
import { User } from '../screens/project-list/search-panel';
import { useHttp } from './http';
import { useEffect } from 'react';
import { cleanObject } from './index';
import { useAsync } from './use-Async';
export const useUsers = (param?: Partial<User>) => {
    // 1. 引入发送http请求的hook
    const client = useHttp()
    const { run, ...result } = useAsync<User[]>()
    useEffect(() => {
        run(client("users", { data: cleanObject(param || {}) }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param])
    return result
}