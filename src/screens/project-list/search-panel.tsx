
// 外部资源包
import React from "react"
import { Input, Form } from 'antd'
// import { useEffect, useState } from "react"
import { Project } from '../../types/project';
import { UserSelect } from '../../components/user-select';
import User from "../../types/User";
// 定义 SearchPanel 的参数类型接口
interface SearchPanelProps {
    users: User[],
    // 和 project 中的类型保持一致
    param: Partial<Pick<Project, 'name' | 'personId'>>
    setParam: (param: SearchPanelProps['param']) => void
}
// SearchPanel 函数组件
export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
    return <Form style={{ marginBottom: '2rem' }} layout={"inline"} action="">
        <Form.Item>
            {/* 添加事件，当输入框变化时调用 useState */}
            {/* 实质：通过name值查找 */}
            <Input
                type="text"
                placeholder={'项目名'}
                value={param.name}
                onChange={e => setParam({
                    ...param,
                    name: e.target.value
                })} />
        </Form.Item>
        {/* 当下拉框选择内容时，触发onChange事件记录当前的id */}
        {/* 实质：通过id查找 */}
        <Form.Item>
            <UserSelect
            // 默认选项
                defaultOptionName={'负责人'}
                value={param.personId}
                onChange={value =>
                    setParam({
                        ...param,
                        personId: value
                    })} />

            {/* 原先的注释 */}
            {/* 这里的value值一定不能多填 */}
            {/* // 这里的id 类型不一致导致了 number 和 string 无法匹配
            // 把id 强制转化为 string 类型，这个问题在后面会解决 */}

        </Form.Item>
    </Form>
}