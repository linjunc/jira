import { useKanbans } from 'utils/kanban';
import { useDocumentTitle } from '../../utils/index';
import { KanbanColumn } from './kanban-columu';
import { useProjectInUrl, useKanbanSearchParams, useTasksSearchParams } from './util';
import styled from '@emotion/styled';
import { SearchPanel } from './search-pannel';
import { ScreenContainer } from '../../components/lib';
import { useTasks } from 'utils/task';
import { Spin } from 'antd';
import { CreateKanban } from './create-kanban';
export const KanbanScreen = () => {
    useDocumentTitle('看板列表')
    const { data: currentProejct } = useProjectInUrl()
    // 传入project id 获取看板数据
    const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(useKanbanSearchParams())
    // 设置loading
    const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams())
    // 设置loading
    const isLoading = taskIsLoading || kanbanIsLoading
    return <ScreenContainer>
        <h1>{currentProejct?.name}看板</h1>
        <SearchPanel />
        {/* 判断是否处于 loading 状态 */}
        {isLoading ? <Spin size={'large'} /> : <ColumnsContainer>
            {
                kanbans?.map(kanban => <KanbanColumn kanban={kanban} key={kanban.id} />)
            }
            <CreateKanban />
        </ColumnsContainer>}
        
    </ScreenContainer>
}
export const ColumnsContainer = styled.div`
    display:flex;
    flex: 1;
    overflow-x: scroll;
    margin-right: 2rem;
`