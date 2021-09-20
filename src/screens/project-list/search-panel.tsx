/*
 * @Author: 林俊丞
 * @Date: 2021-09-20 13:47:42
 * @LastEditors: 林俊丞
 * @LastEditTime: 2021-09-20 17:23:34
 * @Description: 
 */
// 外部资源包
import React from "react"
// import { useEffect, useState } from "react"
// 内部资源包

// 定义泛型
export interface User {
    id: string;
    name: string;
    email: string;
    title: string;
    organization: string;
}
interface SearchPanelProps {
    users: User[],
    param: {
        name: string,
        personId: string
    },
    setParam: (param: SearchPanelProps['param']) => void
}
// SearchPanel 函数组件
export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
    return <form action="">
        <div>
            {/* 添加事件，当输入框变化时调用 useState */}
            {/* 实质：通过name值查找 */}
            <input type="text" value={param.name} onChange={e => setParam({
                ...param,
                name: e.target.value
            })} />
            {/* 当下拉框选择内容时，触发onChange事件记录当前的id */}
            {/* 实质：通过id查找 */}
            <select value={param.personId} onChange={e => setParam({
                ...param,
                personId: e.target.value
            })} >
                <option value={' '} >负责人</option>
                {
                    users.map(users => <option key={users.id} value={users.id}>{users.name}</option>)
                }
            </select>
        </div>
    </form>
}