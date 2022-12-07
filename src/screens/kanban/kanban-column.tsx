import { Kanban } from "../../types/kanban";
import { useTasks } from "../../utils/task";
import { useKanbanQueryKey, useTaskModal, useTasksSearchParam } from "./util";
import taskIcon from "assets/task.svg";
import bugIcon from "assets/bug.svg";
import { useTaskTypes } from "../../utils/task-type";
import styled from "@emotion/styled";
import { Button, Card, Modal } from "antd";
import { CreateTask } from "./create-task";
import { Task } from "../../types/task";
import { Mark } from "../../components/mark";
import { Row } from "../../components/lib";
import { useDeleteKanban } from "../../utils/kanban";

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
  if (!name) {
    return null;
  } else {
    return (
      <img
        className={"icon"}
        src={name === "task" ? taskIcon : bugIcon}
        alt=""
      />
    );
  }
};
const TaskCard = ({ task }: { task: Task }) => {
  const { startEdit } = useTaskModal();
  const { name: keyword } = useTasksSearchParam();
  return (
    <Card
      onClick={() => startEdit(task.id)}
      style={{ marginBottom: "0.5rem", cursor: "pointer" }}
      key={task.id}
    >
      <p>
        <Mark name={task.name} keyword={keyword} />
      </p>
      <TaskTypeIcon id={task.typeId} />
    </Card>
  );
};
export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: allTasks } = useTasks(useTasksSearchParam());
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);
  const { mutateAsync } = useDeleteKanban(useKanbanQueryKey());
  const startDelete = () => {
    Modal.confirm({
      title: "Are you sure to delete this kanban?",
      onOk() {
        return mutateAsync({ id: kanban.id });
      },
    });
  };

  return (
    <Container>
      <Row between={true}>
        <h3>{kanban.name}</h3>
        <Button type={"link"} onClick={startDelete}>
          Delete
        </Button>
      </Row>
      <TaskContainer>
        {tasks?.map((task) => (
          <TaskCard task={task} key={task.id} />
        ))}
        <CreateTask kanbanId={kanban.id} />
      </TaskContainer>
    </Container>
  );
};

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;

  .icon {
    width: 2rem;
    height: 2rem;
  }
`;

const TaskContainer = styled.div`
  overflow: scroll;
  flex: 1;

  ::-webkit-scrollbar {
    display: none;
  }
`;
