import { Button, Drawer, Form, Input, Spin } from "antd";
import { DrawerProps } from "antd/lib/drawer";
import { ErrorBox } from "../../components/lib";
import { useAddEpic } from "../../utils/epic";
import { useEpicQueryKey } from "./util";
import { useProjectIdInUrl } from "../kanban/util";
import { Container } from "screens/project-list/project-modal";
import { useEffect } from "react";

export const CreateEpic = (
  props: Pick<DrawerProps, "visible"> & { onClose: () => void }
) => {
  const { mutate: addEpic, isLoading, error } = useAddEpic(useEpicQueryKey());
  const [form] = Form.useForm();
  const projectId = useProjectIdInUrl();
  const onFinish = async (values: any) => {
    await addEpic({ ...values, projectId });
    props.onClose();
  };
  useEffect(() => {
    form.resetFields();
  }, [form, props.visible]);

  return (
    <Drawer
      destroyOnClose={true}
      forceRender={true}
      visible={props.visible}
      onClose={props.onClose}
      width={"100%"}
    >
      <Container>
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <ErrorBox error={error} />
            <Form
              form={form}
              layout={"vertical"}
              style={{ width: "40rem" }}
              onFinish={onFinish}
            >
              <Form.Item
                label={"Name"}
                name={"name"}
                rules={[
                  { required: true, message: "epic name can't be empty" },
                ]}
              >
                <Input placeholder={"please input epic name"} />
              </Form.Item>

              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  loading={isLoading}
                  type={"primary"}
                  htmlType={"submit"}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  );
};
