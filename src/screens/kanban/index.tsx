import { useKanbans } from 'utils/kanban';
import { useDocumentTitle } from '../../utils/index';
import { KanbanColumn } from './kanban-columu';
import { useProjectInUrl, useKanbanSearchParams } from './util';
import styled from '@emotion/styled';
import { SearchPanel } from './search-pannel';
import { ScreenContainer } from '../../components/lib';
export const KanbanScreen = () => {
    useDocumentTitle('看板列表')
    const { data: currentProejct } = useProjectInUrl()
    const { data: kanbans } = useKanbans(useKanbanSearchParams())
    return <ScreenContainer>
        <h1>{currentProejct?.name}看板</h1>
        <SearchPanel />
        <ColumnsContainer>
            {
                kanbans?.map(kanban => <KanbanColumn kanban={kanban} key={kanban.id} />)
            }
        </ColumnsContainer>
    </ScreenContainer>
}
const ColumnsContainer = styled.div`
display:flex;
overflow: hidden;
margin-right: 2rem;
`