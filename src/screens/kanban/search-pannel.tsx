import { useTasksSearchParams } from "./util"
import { useSetUrlSearchParam } from '../../utils/url';
import { Row } from '../../components/lib';
import { Button, Input } from "antd";
import { UserSelect } from '../../components/user-select';
import { TaskTypeSelect } from '../../components/task-type-select';

// 搜索框功能实现
export const SearchPanel = () => {
    // 这两个类似于useState ,一个用来读，一个用来写
    // 当这个状态发生改变的时候，需要请求数据
    const searchParams = useTasksSearchParams()
    // 映射到url上
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
        {/* 普通文本搜索框，通过 */}
        <Input
            style={{ width: '20rem' }}
            placeholder={'任务名'}
            value={searchParams.name}
            onChange={evt => setSearchParams({ name: evt.target.value })}
        />
        {/* 经办人搜索框，采用同类型框 */}
        <UserSelect
            defaultOptionName={'经办人'}
            value={searchParams.processId}
            onChange={value => setSearchParams({ processorId: value })}
        />
        {/* 任务类型选择框，采用的是首页相同的框 */}
        <TaskTypeSelect
            defaultOptionName={'类型'}
            value={searchParams.typeId}
            onChange={value => setSearchParams({ typeId: value })}
        />
        <Button onClick={reset}>清除筛选器</Button>
    </Row>
}