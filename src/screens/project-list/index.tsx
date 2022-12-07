import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce, useDocumentTitle } from "../../utils";
import { useProjects } from "../../utils/project";
import { Button } from "antd";
import { useUsers } from "../../utils/users";
import { useProjectModal, useProjectsSearchParam } from "./util";
import { ErrorBox, Row, ScreenContainer } from "../../components/lib";

export const ProjectListScreen = () => {
  useDocumentTitle("Project List", false);

  const [param, setParam] = useProjectsSearchParam();
  // todo 页面刷新发送了两次请求
  const {
    isLoading,
    error,
    data: list,
  } = useProjects(useDebounce(param, 1000));
  const { data: users } = useUsers();

  const { open } = useProjectModal();

  return (
    <ScreenContainer>
      <Row between={true}>
        <h1>Project List</h1>
        <Button onClick={open}>Add Project</Button>
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      <ErrorBox error={error} />
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </ScreenContainer>
  );
};
ProjectListScreen.whyDidYouRender = false;
