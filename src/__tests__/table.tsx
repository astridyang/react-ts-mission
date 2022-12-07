import { Table } from "antd";
import { render, screen, waitFor } from "@testing-library/react";
import fakeData from "./fake.json";

const dataSource = [
  {
    key: "1",
    name: "胡彦斌",
    age: 32,
    address: "西湖区湖底公园1号",
  },
  {
    key: "2",
    name: "胡彦祖",
    age: 42,
    address: "西湖区湖底公园1号",
  },
];

const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "住址",
    dataIndex: "address",
    key: "address",
  },
];
const projectColumns = [
  {
    title: "name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "organization",
    dataIndex: "organization",
    key: "name",
  },
];
const TestTable = () => {
  return (
    <>
      <Table
        rowKey={"id"}
        dataSource={fakeData.projects}
        columns={projectColumns}
      />
    </>
  );
};

const waitTable = () => {
  return waitFor(() => expect(screen.getByText("rrr")).toBeInTheDocument(), {
    timeout: 3000,
  });
};

test("table render", async () => {
  render(<TestTable />);
  await waitTable();
  // console.log(screen.getAllByRole("row"))
  expect(screen.getAllByRole("row").length).toBe(fakeData.projects.length + 1);
});
