// /** @jsx jsx */
// import {jsx} from '@emotion/react'
import { Form, Input } from "antd";
import { UserSelect } from "../../components/user-select";
import { User } from "../../types/user";
import { Project } from "../../types/project";

interface SearchPanelProps {
  users: User[];
  param: Partial<Pick<Project, "name" | "personId">>;
  setParam: (param: SearchPanelProps["param"]) => void;
}

export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  return (
    // 用 css 报错
    <Form style={{ marginBottom: "2rem" }} layout={"inline"}>
      <Form.Item>
        {/*setParam(Object.assign({},param,{name:event.target.value}))*/}
        <Input
          placeholder={"project name"}
          type="text"
          value={param.name}
          onChange={(evt) =>
            setParam({ ...param, name: evt.currentTarget.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOptionName={"负责人"}
          value={param.personId}
          onChange={(value) => setParam({ ...param, personId: value })}
        />
      </Form.Item>
    </Form>
  );
};
