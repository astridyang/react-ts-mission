import { Modal, Rate, Table, TableProps } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Pin } from "../../components/pin";
import { useDeleteProject, useEditProject } from "../../utils/project";
import { ButtonNoPadding } from "../../components/lib";
import { useProjectModal, useProjectsQueryKey } from "./util";
import { User } from "../../types/user";
import { Project } from "../../types/project";
import React from "react";

interface ListProps extends TableProps<Project> {
  users: User[];
  refresh?: () => void;
}

export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject(useProjectsQueryKey());

  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });

  const { startEdit } = useProjectModal();
  const editProject = (id: number) => () => startEdit(id);

  // const menuItems = [
  //     {
  //         key: 'edit',
  //         icon: (<ButtonNoPadding type={'link'}>Edit</ButtonNoPadding>)
  //     },
  //     {
  //         key: 'delete',
  //         icon: (<ButtonNoPadding type={'link'}>Delete</ButtonNoPadding>)
  //     }
  // ]
  const { mutate: deleteProject } = useDeleteProject(useProjectsQueryKey());
  const confirmDeleteProject = (id: number) => () => {
    Modal.confirm({
      title: "Are you sure to delete this project?",
      content: "click confirm to delete",
      okText: "Confirm",
      onOk() {
        deleteProject({ id });
      },
    });
  };

  return (
    <Table
      rowKey={"id"}
      pagination={false}
      {...props}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              />
            );
          },
        },
        {
          title: "Name",
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
        },
        {
          title: "Organization",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "Created",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "None"}
              </span>
            );
          },
        },
        {
          render(value, project) {
            // return <Dropdown overlay={<Menu items={menuItems} onClick={onMenuItemClick}/>}>
            //     <ButtonNoPadding type={'link'}>...</ButtonNoPadding>
            // </Dropdown>
            return (
              <>
                <ButtonNoPadding
                  style={{ marginRight: "1rem" }}
                  type={"link"}
                  onClick={editProject(project.id)}
                >
                  Edit
                </ButtonNoPadding>
                <ButtonNoPadding
                  type={"link"}
                  onClick={confirmDeleteProject(project.id)}
                >
                  Delete
                </ButtonNoPadding>
              </>
            );
          },
        },
      ]}
    />
  );
};
