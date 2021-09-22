/*
 * @Author: 林俊丞
 * @Date: 2021-09-20 13:46:21
 * @LastEditors: cheng
 * @LastEditTime: 2021-09-22 19:47:37
 * @Description: 
 */
// 外部资源包
import React from "react"
import { useState } from "react"
// 内部模块
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import { useDebounce } from "utils"
import styled from '@emotion/styled';
import { Typography } from "antd"
import { useProjects } from "utils/project"
import { useUsers } from '../../utils/user';
// 大部分都是运行时才发现的
// ProjectListScreen 函数组件
export const ProjectListScreen = () => {
    // 要搜索的数据
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    // 通过防抖处理
    const debounceParam = useDebounce(param, 1000)
    // 引入自定义的 async hook
    // 不知道怎么解决这里的类型问题
    const { isLoading, error, data: list } = useProjects(debounceParam)

    const { data: users } = useUsers()
    return <Container>
        {/* 通过 props 来传递参数 */}
        <h1>项目列表</h1>
        <SearchPanel users={users || []} param={param} setParam={setParam} />
        {/* 如果error 采用 antd 组件 */}
        {/* 未解决error丢失问题 初步判断是由异步事件引起 */}
        {error ? <Typography.Text type={'danger'}>{error?.message + '错误'}</Typography.Text> : null}
        <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
}
const Container = styled.div`
    padding: 3.2rem;
`