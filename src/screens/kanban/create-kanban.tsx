import { useState } from "react"
import { useAddKanban } from "utils/kanban";
import { useKanbansQueryKey, useProjectIdInUrl } from './util';
import { ColumnsContainer } from './index';
import { Input } from "antd";
import { Container } from "./kanban-columu";
// 新增看板内容
export const CreateKanban = () => {
    const [name, setName] = useState('')
    const projectId = useProjectIdInUrl()
    const { mutateAsync: addKanban } = useAddKanban(useKanbansQueryKey())
    const submit = async () => {
        await addKanban({ name, projectId })
        setName('')
    }
    return <Container>
            <Input
                size={'large'}
                placeholder={'新建看板名称'}
                onPressEnter={submit}
                value={name}
                onChange={evt => setName(evt.target.value)}
            />
    </Container>
}