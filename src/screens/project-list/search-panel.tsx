
// 外部资源包
import React from "react"
import { Input, Select, Form } from 'antd'
// import { useEffect, useState } from "react"
// 内部资源包

// 定义人员基本信息接口
// 这里需要多添加一个 token 字段，在登陆时需要记录登录信息，通过 token 令牌认证
export interface User {
    id: string;
    name: string;
    email: string;
    title: string;
    organization: string;
    token: string
}
// 定义 SearchPanel 的参数类型接口
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
    return <Form style={{ marginBottom: '2rem'}} layout={"inline"} action="">
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
            <Select
                value={param.personId}
                onChange={value => setParam({
                    ...param,
                    personId: value
                })} >
                {/* 这里的value值一定不能多填 */}
                <Select.Option value={''} >负责人</Select.Option>
                {
                    users.map(users =>
                        <Select.Option
                            key={users.id}
                            value={users.id}>{users.name}
                        </Select.Option>)
                }
            </Select>
        </Form.Item>
    </Form>
}