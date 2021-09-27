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
import { TaskModel } from './task-model';
import { DragDropContext } from 'react-beautiful-dnd'
import { Drop, DropChild, Drag } from '../../components/drag-and-drop';
export const KanbanScreen = () => {
    useDocumentTitle('看板列表')
    const { data: currentProejct } = useProjectInUrl()
    // 传入project id 获取看板数据
    const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(useKanbanSearchParams())
    // 设置loading，传入url内容
    const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams())
    // 设置loading
    const isLoading = taskIsLoading || kanbanIsLoading
    // 这个回调中一般做持久化的工作
    return (
        <DragDropContext onDragEnd={() => { }}>
            <ScreenContainer>
                <h1>{currentProejct?.name}看板</h1>
                <SearchPanel />
                {/* 判断是否处于 loading 状态 */}
                {
                    isLoading ?
                        <Spin size={'large'} /> : (
                            <Drop type={'COLUMN'} direction={"horizontal"} droppableId={'kanban'} >
                                <ColumnsContainer>
                                    {
                                        kanbans?.map((kanban, index) =>
                                            <Drag
                                                key={kanban.id}
                                                draggableId={'kanban' + kanban.id}
                                                index={index}
                                            >
                                                <KanbanColumn kanban={kanban} key={kanban.id} />
                                            </Drag>)
                                    }
                                    <CreateKanban />
                                </ColumnsContainer>
                            </Drop>)
                }
                <TaskModel />
            </ScreenContainer>
        </DragDropContext>)
}
// 改成 drop 的子元素
export const ColumnsContainer = styled(DropChild)`
    display:flex;
    flex: 1;
    overflow-x: scroll;
    margin-right: 2rem;
`