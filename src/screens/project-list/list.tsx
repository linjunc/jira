/*
 * @Author: 林俊丞
 * @Date: 2021-09-20 13:47:28
 * @LastEditors: cheng
 * @LastEditTime: 2021-09-24 20:04:12
 * @Description: List 列表
 */
// 目前可以不引入这个文件了
import React from "react"
import { User } from './search-panel';
import { Dropdown, Menu, Table, TableProps } from 'antd'
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Pin } from '../../components/pin';
import { useEditProject } from "utils/project";
import { ButtonNoPadding } from '../../components/lib';
// 定义人员类型接口
export interface Project {
    id: number;
    name: string;
    personId: number;
    pin: boolean;
    organization: string;
    created: number
}
// 定义函数的接口
// 继承自 Table 标签的接口，tableprops 中有着 props 值的类型定义
interface ListProps extends TableProps<Project> {
    users: User[];
    refresh?: () => void;
    setProjectModelOpen: (isOpen: boolean) => void
}

// type PropsType = Omit<ListProps, 'users'>
// 人员列表表单
// List 组件中传入的类型就是 TableProps 类型，也就是说，props的类型是tableprops
export const List = ({ users, ...props }: ListProps) => {
    // 引入自定义 hook 中的方法
    const { mutate } = useEditProject()
    const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin }).then(props.refresh)
    return <Table rowKey={"id"} pagination={false} columns={[
        {
            title: <Pin checked={true} disabled={true} />,
            render(value, project) {
                // 这里需要发送编辑请求
                return <Pin
                    checked={project.pin}
                    // 利用柯里化技术，首先传入 id ,在传入pin ，最后执行 mutate
                    onCheckedChange={
                        // mutate({ id: project.id, pin })
                        pinProject(project.id)
                    }
                />
            }

        },
        {
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
        },
        {

            render(value, project) {
                // overlay 是默认显示的东西,Menu是菜单，下拉菜单
                return <Dropdown overlay={<Menu>
                    <Menu.Item key={'edit'}>
                        <ButtonNoPadding type={'link'} onClick={() => props.setProjectModelOpen(true)}>编辑</ButtonNoPadding>
                    </Menu.Item>
                </Menu>}>
                    <ButtonNoPadding type={"link"}>
                        ...
                    </ButtonNoPadding>
                </Dropdown>
            }
        }
    ]} {...props} />
}