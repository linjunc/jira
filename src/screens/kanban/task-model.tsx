import { useForm } from "antd/lib/form/Form"
import { useEditTask } from "utils/task";
import { useTasksModel, useTasksQueryKey } from './util';
import { useEffect } from 'react';
import { Button, Form, Input, Modal } from "antd";
import { UserSelect } from "components/user-select";
import { TaskTypeSelect } from '../../components/task-type-select';
import { useDeleteTask } from '../../utils/task';
// 采用自带样式antd form，直接解构
const layout = {
    // 左边文字
    labelCol: { span: 8 },
    // 右边表单
    wrapperCol: { span: 16 }
}

export const TaskModel = () => {
    const [form] = useForm()
    const { editingTaskId, editingTask, close } = useTasksModel()
    // 解构一个 task 方法
    const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(useTasksQueryKey())
    // 添加一个删除任务的方法
    const { mutateAsync: deleteTask } = useDeleteTask(useTasksQueryKey())
    // 点击取消时，调用close同时清空表单
    const onCancel = () => {
        close()
        form.resetFields()
    }
    const onOk = async () => {
        // 获取表单数据
        await editTask({ ...editingTask, ...form.getFieldsValue() })
        // 关闭表单
        close()
    }
    const startDelete = () => {
        close()
        Modal.confirm({
            okText: '确定',
            cancelText: '取消',
            title: '你确定删除任务吗？',
            onOk() {
                return deleteTask({ id: Number(editingTaskId) })
            }
        })
    }
    useEffect(() => {
        form.setFieldsValue(editingTask)
    }, [form, editingTask])
    // 需要强制渲染
    return <Modal
        forceRender={true}
        onCancel={onCancel}
        onOk={onOk}
        okText={'确认'}
        cancelText={'取消'}
        confirmLoading={editLoading}
        title={'编辑任务'}
        visible={!!editingTaskId}
    >
        <Form {...layout} initialValues={editingTask} form={form}>
            <Form.Item label={'任务名'} name={'name'} rules={[{ required: true, message: '请输入任务名' }]} >
                <Input />
            </Form.Item>
            <Form.Item label={'经办人'} name={'processorId'} rules={[{ required: true, message: '请输入经办人' }]} >
                <UserSelect defaultOptionName={'经办人'} />
            </Form.Item>
            <Form.Item label={'类型'} name={'typeId'} rules={[{ required: true, message: '请选择类型' }]} >
                <TaskTypeSelect />
            </Form.Item>
        </Form>
        <div style={{ textAlign: 'right' }}>
            <Button style={{ fontSize: '14px' }} size={'small'} onClick={startDelete}>删除</Button>
        </div>
    </Modal>
}