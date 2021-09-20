/*
 * @Author: 林俊丞
 * @Date: 2021-09-20 13:46:21
 * @LastEditors: 林俊丞
 * @LastEditTime: 2021-09-20 17:35:02
 * @Description: 
 */
// 外部资源包
import React from "react"
import { useEffect, useState } from "react"
import qs from "qs"

// 内部模块
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import { cleanObject, useMount, useDebounce } from "utils"
// 大部分都是运行时才发现的
// 引入配置文件中的请求地址
const apiUrl = process.env.REACT_APP_API_URL
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
    const debounceParam = useDebounce(param, 200)
    // 人员职位列表
    const [list, setList] = useState([])
    // 监听 param 变化
    useEffect(() => {
        // 获取假数据 成功 ok 返回 true
        // 采用 qs 来解析 get 请求参数
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`).then(async response => {
            if (response.ok) {
                // .json 用来转化json对象
                setList(await response.json())
            }
        })
    }, [debounceParam])
    // 初始化users，[]只调用一次
    useMount(() => {
        fetch(`${apiUrl}/users`).then(async response => {
            if (response.ok) {
                setUsers(await response.json())
            }
        })
    })
    return <div>
        {/* 通过 props 来传递参数 */}
        <SearchPanel users={users} param={param} setParam={setParam} />
        <List users={users} list={list} />
    </div>
}