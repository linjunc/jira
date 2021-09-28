import { useKanbans } from 'utils/kanban';
import { useDocumentTitle } from '../../utils/index';
import { KanbanColumn } from './kanban-columu';
import { useProjectInUrl, useKanbanSearchParams, useTasksSearchParams, useKanbansQueryKey, useTasksQueryKey } from './util';
import styled from '@emotion/styled';
import { SearchPanel } from './search-pannel';
import { ScreenContainer } from '../../components/lib';
import { useReorderTask, useTasks } from 'utils/task';
import { Spin } from 'antd';
import { CreateKanban } from './create-kanban';
import { TaskModel } from './task-model';
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { Drop, DropChild, Drag } from '../../components/drag-and-drop';
import { useReorderKanban } from '../../utils/kanban';
import { useCallback } from 'react';
export const KanbanScreen = () => {
    useDocumentTitle('看板列表')
    const { data: currentProject } = useProjectInUrl()
    // 传入project id 获取看板数据
    const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(useKanbanSearchParams())
    // 设置loading，传入url内容
    const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams())
    // 设置loading
    const isLoading = taskIsLoading || kanbanIsLoading
    // 实现拖拽的hook
    const onDragEnd = useDragEnd()
    // 这个回调中一般做持久化的工作
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <ScreenContainer>
                <h1>{currentProject?.name}看板</h1>
                <SearchPanel />
                {/* 判断是否处于 loading 状态 */} 
                {
                    isLoading ?
                        <Spin size={'large'} /> : (
                            <ColumnsContainer>
                                <Drop type={'COLUMN'} direction={"horizontal"} droppableId={'kanban'} >
                                    <DropChild style={{ display: 'flex' }}>
                                        {
                                            kanbans?.map((kanban, index) =>
                                                <Drag
                                                    key={kanban.id}
                                                    draggableId={'kanban' + kanban.id}
                                                    index={index}
                                                >
                                                    <KanbanColumn kanban={kanban} key={kanban.id} />
                                                </Drag>
                                            )}
                                    </DropChild>
                                </Drop>
                                <CreateKanban />
                            </ColumnsContainer>
                        )
                }
                <TaskModel />
            </ScreenContainer>
        </DragDropContext>)
}
export const useDragEnd = () => {
    // 先取到看板
    const { data: kanbans } = useKanbans(useKanbanSearchParams())
    const { mutate: reorderKanban } = useReorderKanban(useKanbansQueryKey())
    // 获取task信息
    const { data: allTasks = []} = useTasks(useTasksSearchParams())
    const { mutate: reorderTask } = useReorderTask(useTasksQueryKey())
    return useCallback(({ source, destination, type }: DropResult) => {
        if (!destination) {
            return
        }
        // 看板排序
        if (type === 'COLUMN') {
            const fromId = kanbans?.[source.index].id
            const toId = kanbans?.[destination.index].id
            // 如果没变化的时候直接return
            if (!fromId || !toId || fromId === toId) {
                return
            }
            // 判断放下的位置在目标的什么方位
            const type = destination.index > source.index ? 'after' : 'before'
            reorderKanban({ fromId, referenceId: toId, type })
        }
        if (type === 'ROW') {
            // 通过 + 转变为数字
            const fromKanbanId = +source.droppableId
            const toKanbanId = +destination.droppableId
            // 不允许跨版排序
            if (fromKanbanId !== toKanbanId) {
                return
            }
            // 获取拖拽的元素
            const fromTask = allTasks.filter(task => task.kanbanId === fromKanbanId)[source.index]
            const toTask = allTasks.filter(task => task.kanbanId === fromKanbanId)[destination.index]
            //
            if (fromTask?.id === toTask?.id) {
                return
            }
            reorderTask({
                fromId: fromTask?.id,
                referenceId: toTask?.id,
                fromKanbanId,
                toKanbanId,
                type: fromKanbanId === toKanbanId && destination.index > source.index ? 'after' : 'before'
            })

        }
    }, [allTasks, kanbans, reorderKanban, reorderTask])
}
// 改成 drop 的子元素
export const ColumnsContainer = styled('div')`
    display:flex;
    flex: 1;
    overflow-x: scroll;
    margin-right: 2rem;
`