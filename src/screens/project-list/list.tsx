/*
 * @Author: 林俊丞
 * @Date: 2021-09-20 13:47:28
 * @LastEditors: cheng
 * @LastEditTime: 2021-09-23 23:29:00
 * @Description: List 列表
 */
// 目前可以不引入这个文件了
import React from "react"
import { User } from './search-panel';
import { Table, TableProps } from 'antd'
import dayjs from "dayjs";
import { Link } from "react-router-dom";
// 定义人员类型接口
export interface Project {
    id: string;
    name: string;
    personId: string;
    pin: boolean;
    organization: string;
    created: number
}
// 定义函数的接口
// 继承自 Table 标签的接口，tableprops 中有着 props 值的类型定义
interface ListProps extends TableProps<Project> {
    users: User[]
}

// type PropsType = Omit<ListProps, 'users'>
// 人员列表表单
// List 组件中传入的类型就是 TableProps 类型，也就是说，props的类型是tableprops
export const List = ({ users, ...props }: ListProps) => {
    return <Table rowKey={"id"} pagination={false} columns={[{
        title: '名称',
        sorter: (a, b) => a.name.localeCompare(b.name),
        render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>
        }
    },
    {
        title: '部门',
        dataIndex: 'organization',
        sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
        title: '负责人',
        render(value, project) {
            return <span >{users.find(user => user.id === project.personId)?.name || '未知'}</span>
        },

    },
    {
        title: '创建时间',
        render(value, project) {
            return <span>
                {
                    project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'
                }
            </span>
        }
    }
    ]} {...props} />

}