import { Button, Divider, List, Popover, Typography } from 'antd';
import { useProjects } from 'utils/project';
import styled from '@emotion/styled';
import { ButtonNoPadding } from './lib';
export const ProjectPopover = (props: { setProjectModelOpen: (isOpen: boolean) => void }) => {
    // 通过这个 hook 来获取 project 列表
    const { data: projects, isLoading } = useProjects()
    // 筛选出收藏的项目
    const pinnedProjects = projects?.filter(project => project.pin)
    const content = <ContentContainer>
        <Typography.Text type={"secondary"} >收藏项目</Typography.Text>
        <List>
            {
                pinnedProjects?.map(project => <List.Item>
                    <List.Item.Meta title={project.name} />
                </List.Item>)
            }
        </List>
        <Divider />
        <ButtonNoPadding onClick={() => props.setProjectModelOpen(true)} type={'link'}>创建项目</ButtonNoPadding>
    </ContentContainer>
    return <Popover placement={'bottom'} content={content}>
        <span>项目</span>
    </Popover>
}
const ContentContainer = styled.div`
    min-width: 30rem;
`