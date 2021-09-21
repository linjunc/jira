/*
 * @Author: 林俊丞
 * @Date: 2021-09-20 13:46:21
 * @LastEditors: cheng
 * @LastEditTime: 2021-09-21 20:59:47
 * @Description: 
 */
// 外部资源包
import React from "react"
import { useEffect, useState } from "react"
// 内部模块
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import { cleanObject, useMount, useDebounce } from "utils"
import { useHttp } from '../../utils/http';
import styled from '@emotion/styled';
// 大部分都是运行时才发现的
// ProjectListScreen 函数组件
export const ProjectListScreen = () => {
    // 全部人员资料
    const [users, setUsers] = useState([])
    // 要搜索的数据
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    // 通过防抖处理
    const debounceParam = useDebounce(param, 1000)
    // 人员职位列表
    const [list, setList] = useState([])
    // 引入一个自定义的 http hook
    const client = useHttp()
    // 监听 param 变化
    useEffect(() => {
        // 获取假数据 成功 ok 返回 true
        // 采用 qs 来解析 get 请求参数
        client('projects', { data: cleanObject(debounceParam) }).then(setList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceParam])
    // 初始化users，[]只调用一次
    useMount(() => {
        client('users').then(setUsers)
        // fetch(`${apiUrl}/users`).then(async response => {
        //     if (response.ok) {
        //         setUsers(await response.json())
        //     }
        // })
    })
    return <Container>
        {/* 通过 props 来传递参数 */}
        <h1>项目列表</h1>
        <SearchPanel users={users} param={param} setParam={setParam} />
        <List users={users} list={list} />
    </Container>
}
const Container = styled.div`
    padding: 3.2rem;
`