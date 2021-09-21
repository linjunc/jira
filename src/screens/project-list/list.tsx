/*
 * @Author: 林俊丞
 * @Date: 2021-09-20 13:47:28
 * @LastEditors: 林俊丞
 * @LastEditTime: 2021-09-20 17:49:31
 * @Description: List 列表
 */
// 目前可以不引入这个文件了
import React from "react"
import { User } from './search-panel';
// 定义人员类型接口
interface Project {
    id: string;
    name: string;
    personId: string;
    pin: boolean;
    organization: string;
}
// 定义函数的接口
interface ListProps {
    list: Project[],
    users: User[]
}
// 人员列表表单
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