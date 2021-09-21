/*
 * @Author: 林俊丞
 * @Date: 2021-09-20 13:47:28
 * @LastEditors: cheng
 * @LastEditTime: 2021-09-21 21:23:04
 * @Description: List 列表
 */
// 目前可以不引入这个文件了
import React from "react"
import { User } from './search-panel';
import { Table } from 'antd'
import dayjs from "dayjs";
// 定义人员类型接口
interface Project {
    id: string;
    name: string;
    personId: string;
    pin: boolean;
    organization: string;
    created:number
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
        render(value,project) {
            return <span>
                {
                    project.created ? dayjs(project.created).format('YYYY-MM-DD'): '无'
                }
            </span>
        }
    }
]} dataSource={list} />

}