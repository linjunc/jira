import { Button, Drawer, Form, Input, Spin } from "antd"
import { useProjectModel } from './util';
import { UserSelect } from '../../components/user-select';
import { useEditProject, useAddProject } from '../../utils/project';
import { useForm } from "antd/lib/form/Form";
import { useEffect } from 'react';
import { ErrorBox } from '../../components/lib';
import styled from "@emotion/styled";
// 这是一个编辑框的页面，也就是点击创建项目啥的会弹出来的页面
// 新增模块
export const ProjectModel = () => {
    const { projectModelOpen, close, editingProject, isLoading } = useProjectModel()
    // 不管是哪个得到的都是一个hook
    const useMutateProject = editingProject ? useEditProject : useAddProject
    // 为了区分 isLoading 重新命名一下
    const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject()
    // 获取表单，重置表单
    const [form] = useForm()
    const onFinish = (values: any) => {
        mutateAsync({ ...editingProject, ...values }).then(() => {
            form.resetFields()
            close()
        })
    }
    // 定义一个变量用来显示页面的标题 
    const title = editingProject ? '编辑项目' : '创建项目'
    useEffect(() => {
        form.setFieldsValue(editingProject)
    }, [editingProject, form])
    return (
        // 强制渲染
        <Drawer
            forceRender={true}
            onClose={close}
            visible={projectModelOpen}
            width={'100%'} >
            {
                isLoading ? <Spin size={'large'} /> : <Container>
                    <h1>{title}</h1>
                    <ErrorBox error={error} />
                    <Form form={form} layout={"vertical"} style={{ width: '40rem' }} onFinish={onFinish} >
                        <Form.Item label={"名称"} name={'name'} rules={[{ required: true, message: "请输入项目名" }]}>
                            <Input placeholder={'请输入项目名称'} />
                        </Form.Item>
                        <Form.Item label={"部门"} name={'organization'} rules={[{ required: true, message: "请输入部门名" }]}>
                            <Input placeholder={'请输入部门名称'} />
                        </Form.Item>
                        <Form.Item label={"负责人"} name={'personId'}>
                            <UserSelect defaultOptionName={'负责人'} />
                        </Form.Item>
                        <Form.Item  >
                            {/* 点击提交触发onFinish方法 */}
                            <Button loading={mutateLoading} type={"primary"} htmlType={"submit"} >提交</Button>
                        </Form.Item>
                    </Form>
                </Container>
            }
            {/* <h1>Project Model</h1>
            <Button onClick={close}>关闭</Button> */}
        </Drawer>
    )
}
const Container = styled.div`
    flex-direction: column;
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
`