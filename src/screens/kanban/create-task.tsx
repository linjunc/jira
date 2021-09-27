import { Card, Input } from 'antd';
import { useState, useEffect } from 'react';
import { useAddTask } from "utils/task"
import { useTasksQueryKey, useProjectIdInUrl } from './util';
// 一个用来新增任务的方法，需要在使用的时候传入column id
export const CreateTask = ({ kanbanId }: { kanbanId: number }) => {
    const [name, setName] = useState('')
    // 发送请求实现 addtask
    const { mutateAsync: addTask } = useAddTask(useTasksQueryKey())
    const projectId = useProjectIdInUrl()
    const [inputMode, setInputMode] = useState(false)
    // 提交发送请求，采用的都是 react-query
    const submit = async () => {
        await addTask({ projectId, name, kanbanId })
        setInputMode(false)
        setName('')
    }
    const toggle = () => setInputMode(mode => !mode)
    // 判断当前的输入框状态，用来清理数据,监视输入变化
    // 如果脱焦则会设置为空
    useEffect(() => {
        if (!inputMode) {
            setName('')
        }
    }, [inputMode])
    // 当点击时，会触发toggle，mode变化，显示最后的卡片
    if (!inputMode) {
        return <div onClick={toggle} >+创建事务</div>
    }
    return <Card>
        <Input
            onBlur={toggle}
            placeholder={'需要做些什么'}
            autoFocus={true}
            onPressEnter={submit}
            value={name}
            onChange={evt => setName(evt.target.value)}
        />
    </Card>
}