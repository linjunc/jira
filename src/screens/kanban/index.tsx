import { useKanbans } from 'utils/kanban';
import { useDocumentTitle } from '../../utils/index';
import { KanbanColumn } from './kanban-columu';
import { useProjectInUrl, useKanbanSearchParams } from './util';
import styled from '@emotion/styled';
export const KanbanScreen = () => {
    useDocumentTitle('看板列表')
    const { data: currentProejct } = useProjectInUrl()
    const { data: kanbans } = useKanbans(useKanbanSearchParams())
    return <div>
        <h1>{currentProejct?.name}看板</h1>
        <ColumnsContainer>
            {
                kanbans?.map(kanban => <KanbanColumn kanban={kanban} key={kanban.id} />)
            }
        </ColumnsContainer>
    </div>
}
const ColumnsContainer = styled.div`
display:flex;
overflow: hidden;
margin-right: 2rem;
`