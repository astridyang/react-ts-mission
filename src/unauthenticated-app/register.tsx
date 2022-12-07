import { useAuth } from "../context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "./index";
import { useAsync } from "../utils/use-async";

export const RegisterScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { register } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  const submitHandler = ({
    cpassword,
    ...values
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (cpassword !== values.password) {
      onError(new Error("please input correct confirm password"));
      return;
    }
    run(register(values)).catch((error) => onError(error));
  };

  return (
    <Form onFinish={submitHandler}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "please input username" }]}
      >
        <Input placeholder={"username"} type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "please input password" }]}
      >
        <Input placeholder={"password"} type="password" id={"password"} />
      </Form.Item>
      <Form.Item
        name={"cpassword"}
        rules={[{ required: true, message: "please input password again" }]}
      >
        <Input
          placeholder={"repeat password"}
          type="password"
          id={"cpassword"}
        />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
          Register
        </LongButton>
      </Form.Item>
    </Form>
  );
};
