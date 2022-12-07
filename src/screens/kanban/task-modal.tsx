import { useTaskModal, useTasksQueryKey } from "./util";
import { Button, Form, Modal, Input } from "antd";
import { useDeleteTask, useEditTask } from "../../utils/task";
import { useEffect } from "react";
import { UserSelect } from "../../components/user-select";
import { TaskTypeSelect } from "../../components/taskType-select";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export const TaskModal = () => {
  const [form] = Form.useForm();
  const { editingTaskId, editingTask, close } = useTaskModal();
  const { mutateAsync: editTask, isLoading: editingLoading } = useEditTask(
    useTasksQueryKey()
  );
  const { mutate } = useDeleteTask(useTasksQueryKey());

  const onCancel = () => {
    close();
    form.resetFields();
  };
  const onOk = async () => {
    await editTask({ ...editingTask, ...form.getFieldsValue() });
    close();
  };

  const startDelete = () => {
    close();
    Modal.confirm({
      title: "Are you sure to delete this task?",
      onOk() {
        mutate({ id: Number(editingTaskId) });
      },
    });
  };

  useEffect(() => {
    form.setFieldsValue(editingTask);
  }, [form, editingTask]);
  return (
    <Modal
      forceRender={true}
      onOk={onOk}
      onCancel={onCancel}
      confirmLoading={editingLoading}
      title={"Edit Task"}
      visible={!!editingTaskId}
    >
      <Form initialValues={editingTask} form={form} {...layout}>
        <Form.Item
          label={"task name"}
          name={"name"}
          rules={[{ required: true, message: "task name is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={"processor"} name={"processorId"}>
          <UserSelect defaultOptionName={"processor"} />
        </Form.Item>
        <Form.Item label={"type"} name={"typeId"}>
          <TaskTypeSelect />
        </Form.Item>
      </Form>
      <div style={{ textAlign: "right" }}>
        <Button
          size={"small"}
          style={{ fontSize: "14px" }}
          onClick={startDelete}
        >
          delete
        </Button>
      </div>
    </Modal>
  );
};
