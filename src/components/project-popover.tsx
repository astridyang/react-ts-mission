import { Divider, Popover, Typography } from "antd";
import { List } from "antd";
import { useProjects } from "../utils/project";
import styled from "@emotion/styled";
import { ButtonNoPadding } from "./lib";
import { useProjectModal } from "../screens/project-list/util";

export const ProjectPopover = () => {
  const { open } = useProjectModal();
  const { data: projects, refetch } = useProjects();
  const pinnedProjects = projects?.filter((project) => project.pin);
  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>Pin Project</Typography.Text>
      {pinnedProjects?.map((project) => (
        <List.Item key={project.id}>
          <List.Item.Meta title={project.name} />
        </List.Item>
      ))}
      <Divider />
      <ButtonNoPadding type={"link"} onClick={open}>
        Add Project
      </ButtonNoPadding>
    </ContentContainer>
  );
  return (
    <Popover
      onVisibleChange={() => refetch()}
      placement={"bottom"}
      content={content}
    >
      <span>Project</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
