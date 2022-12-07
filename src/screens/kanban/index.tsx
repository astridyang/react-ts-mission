import {
  useKanbanSearchParam,
  useProjectInUrl,
  useTasksSearchParam,
} from "./util";
import { useKanbans } from "../../utils/kanban";
import { useDocumentTitle } from "../../utils";
import { KanbanColumn } from "./kanban-column";
import styled from "@emotion/styled";
import { SearchPanel } from "./search-panel";
import { ScreenContainer } from "../../components/lib";
import { useTasks } from "../../utils/task";
import { Spin } from "antd";
import { CreateKanban } from "./create-kanban";
import { TaskModal } from "./task-modal";

export const KanbanScreen = () => {
  useDocumentTitle("Kanban List");
  const { data: project } = useProjectInUrl();
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(
    useKanbanSearchParam()
  );
  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParam());
  const isLoading = kanbanIsLoading || taskIsLoading;

  return (
    <ScreenContainer>
      <h2>{project?.name}Kanban</h2>
      <SearchPanel />
      {isLoading ? (
        <Spin size={"large"} />
      ) : (
        <ColumnContainer>
          {kanbans?.map((kanban) => (
            <KanbanColumn kanban={kanban} key={kanban.id} />
          ))}
          <CreateKanban />
        </ColumnContainer>
      )}
      <TaskModal />
    </ScreenContainer>
  );
};

const ColumnContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
  //todo
  ::-webkit-scrollbar {
    //display: none;
  }
`;
