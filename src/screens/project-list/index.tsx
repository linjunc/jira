/*
 * @Author: 林俊丞
 * @Date: 2021-09-20 13:46:21
 * @LastEditors: cheng
 * @LastEditTime: 2021-09-28 20:18:45
 * @Description: 
 */
// 外部资源包
import React from "react"
// 内部模块
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import { useDebounce } from "utils"
import styled from '@emotion/styled';
import { Button } from "antd"
import { useProjects } from "utils/project"
import { useUsers } from '../../utils/user';
import { useDocumentTitle } from '../../utils/index';
// import { useUrlQueryParam } from "utils/url"
import { useProjectsSearchParams, useProjectModel } from './util';
import { ErrorBox, Row } from '../../components/lib';
// 大部分都是运行时才发现的
// ProjectListScreen 函数组件
export const ProjectListScreen = () => {
    // title 文字
    useDocumentTitle('项目列表', false)
    const [param, setParam] = useProjectsSearchParams()
    const {open} = useProjectModel()
    // 通过防抖处理 useDebounce
    // 引入自定义的 async hook
    // 不知道怎么解决这里的类型问题
    const { isLoading, error, data: list} = useProjects(useDebounce(param, 200))
    const { data: users } = useUsers()
    return <Container>
        {/* 通过 props 来传递参数 */}
        <Row between={true}> 
            <h1>项目列表</h1>
            <Button onClick={open}>创建项目</Button>
        </Row>
        <SearchPanel users={users || []} param={param} setParam={setParam} />
        {/* 如果error 采用 antd 组件 */}
        {/* 未解决error丢失问题 初步判断是由异步事件引起 */}
        <ErrorBox error={error}/>
        {/* 采用一个组件来解决 */}
        {/* {error ? <Typography.Text type={'danger'}>{error?.message + '错误'}</Typography.Text> : null} */}
        <List
            loading={isLoading}
            users={users || []}
            dataSource={list || []}
        />
    </Container>
}
const Container = styled.div`
    padding: 3.2rem;
    flex: 1;
    overflow-y: scroll;
`