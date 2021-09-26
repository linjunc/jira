import styled from "@emotion/styled";
import React from "react";
import { Button, Spin, Typography } from 'antd';
import { DevTools } from 'jira-dev-tool';
export const Row = styled.div<{
    // 定义css 中使用的遍历，通过 props来传递值
    gap?: number | boolean,
    between?: boolean,
    marginBottom?: number
}>`
    display: flex;
    align-items: center;
    justify-content: ${props => props.between ? 'space-between' : undefined};
    margin-bottom: ${props => props.marginBottom + 'rem'};
    > *{
        margin-top: 0 !important;
        margin-bottom: 0 !important;
        margin-right: ${props => typeof props.gap === 'number' ? props.gap + 'rem' : props.gap ? '2rem' : undefined};
    }
`
// loading 组件
const FullPage = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`
// 全屏loading效果
export const FullPageLoading = () => <FullPage>
    <Spin size={"large"}></Spin>
</FullPage>
// 全局错误提示
export const FullPageErrorFallback = ({ error }: { error: Error | null }) => <FullPage>
    <DevTools />
    <ErrorBox error={error}/>
    <Typography.Text type={'danger'}>
        {error?.message + '111'}
    </Typography.Text>
</FullPage>
// 没有边距的 button
export const ButtonNoPadding = styled(Button)`
    padding: 0;
`

// 类型守卫
// 如果 value.message 返回 true 则会返回 value is Error ,value 的类型会变成 Error
const isError = (value: any):value is Error => value?.message

export const ErrorBox = ({ error }: { error: unknown }) => {
    if (isError(error)) {
        return (<Typography.Text type={'danger'}>
            {error?.message + '111'}
        </Typography.Text>)
    }
    return null
}