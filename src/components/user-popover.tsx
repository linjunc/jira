import { Button, Divider, List, Popover, Typography } from 'antd';
import { useProjects } from 'utils/project';
import styled from '@emotion/styled';
import { ButtonNoPadding } from './lib';
import { useProjectModel } from '../screens/project-list/util';
import { useUsers } from 'utils/user';
export const UserPopover = () => {
    // 通过这个 hook 来获取 project 列表
    const { data: users, isLoading, refetch } = useUsers()
    // 筛选出收藏的项目
    const content = <ContentContainer>
        <Typography.Text type={"secondary"} >用户列表</Typography.Text>
        <List>
            {
                users?.map(user => <List.Item key={user.id}>
                    <List.Item.Meta title={user.name} />
                </List.Item>)
            }
        </List>
    </ContentContainer>
    return <Popover onVisibleChange={() => refetch()} placement={'bottom'} content={content}>
        <span>用户</span>
    </Popover>
}
const ContentContainer = styled.div`
    min-width: 30rem;
`