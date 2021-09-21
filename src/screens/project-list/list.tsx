/*
 * @Author: 林俊丞
 * @Date: 2021-09-20 13:47:28
 * @LastEditors: cheng
 * @LastEditTime: 2021-09-21 15:37:35
 * @Description: List 列表
 */
// 目前可以不引入这个文件了
import React from "react"
import { User } from './search-panel';
import { Table } from 'antd'
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
    return <Table pagination={false} columns={[{
        title: '名称',
        dataIndex: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name)
    }, {
        title: '负责人',
        render(value, project) {
            return <span>{users.find(user => user.id === project.personId)?.name || '未知'}</span>
        }
    }]} dataSource={list} />

}