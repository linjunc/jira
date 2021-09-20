/*
 * @Author: 林俊丞
 * @Date: 2021-09-20 13:47:28
 * @LastEditors: 林俊丞
 * @LastEditTime: 2021-09-20 17:23:29
 * @Description: 
 */
import React from "react"
import { User } from './search-panel';
// 定义泛型
interface Project {
    id: string;
    name: string;
    personId: string;
    pin: boolean;
    organization: string;
}

interface ListProps {
    list: Project[],
    users: User[]
}
export const List = ({ list, users }: ListProps) => {
    return <table>
        <thead>
            <tr>
                <th>名称</th>
                <th>负责人</th>
            </tr>
        </thead>
        <tbody>
            {/* 遍历 list 列表 */}
            {
                list.map(project => <tr key={project.id}>
                    <td>{project.name}</td>
                    <td>{users.find(user => user.id === project.personId)?.name || '未知'}</td>
                </tr>)
            }
        </tbody>
    </table>
}