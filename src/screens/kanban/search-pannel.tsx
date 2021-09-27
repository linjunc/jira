import { useTasksSearchParams } from "./util"
import { useSetUrlSearchParam } from '../../utils/url';
import { Row } from '../../components/lib';
import { Button, Input } from "antd";
import { UserSelect } from '../../components/user-select';
import { TaskTypeSelect } from '../../components/task-type-select';

// 搜索框
export const SearchPanel = () => {
    const searchParams = useTasksSearchParams()
    const setSearchParams = useSetUrlSearchParam()
    // 重置按钮
    const reset = () => {
        setSearchParams({
            typeId: undefined,
            processId: undefined,
            tagId: undefined,
            name: undefined
        })
    }
    return <Row marginBottom={4} gap={true}>
        {/* 普通搜索框 */}
        <Input
            style={{ width: '20rem' }}
            placeholder={'任务名'}
            value={searchParams.name}
            onChange={evt => setSearchParams({ name: evt.target.value })}
        />
        {/* 经办人搜索框 */}
        <UserSelect
            defaultOptionName={'经办人'}
            value={searchParams.processId}
            onChange={value => setSearchParams({ processorId: value })}
        />
        <TaskTypeSelect
            defaultOptionName={'类型'}
            value={searchParams.typeId}
            onChange={value => setSearchParams({ typeId: value })}
        />
        <Button onClick={reset}>清除筛选器</Button>
    </Row>

}