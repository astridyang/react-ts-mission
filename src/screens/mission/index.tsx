import { Row, ScreenContainer } from "../../components/lib";
import { useProjectInUrl } from "../kanban/util";
import { useDeleteEpic, useEpics } from "../../utils/epic";
import { useEpicQueryKey, useEpicSearchParam } from "./util";
import { useTasks } from "../../utils/task";
import { Button, List, Modal } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { CreateEpic } from "./create-epic";
import { useState } from "react";

export const MissionScreen = () => {
  const { data: currentProject } = useProjectInUrl();
  const { data: epics } = useEpics(useEpicSearchParam());
  const { data: tasks } = useTasks({ projectId: currentProject?.id });
  const [epicCreateOpen, setEpicCreateOpen] = useState(false);
  const { mutate: deleteEpic } = useDeleteEpic(useEpicQueryKey());
  const startDelete = (id: number) => {
    Modal.confirm({
      title: "Are you sure to delete this epic?",
      onOk() {
        deleteEpic({ id });
      },
    });
  };
  return (
    <ScreenContainer>
      <Row between={true}>
        <h2>{currentProject?.name}Epic</h2>
        <Button onClick={() => setEpicCreateOpen(true)}>Add Epic</Button>
      </Row>
      <List
        style={{ overflowY: "scroll" }}
        dataSource={epics}
        itemLayout={"vertical"}
        renderItem={(epic) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Row between={true}>
                  <span>{epic.name}</span>
                  <Button type={"link"} onClick={() => startDelete(epic.id)}>
                    Delete
                  </Button>
                </Row>
              }
              description={
                <div>
                  <div>
                    start time: {dayjs(epic.start).format("YYYY-MM-DD")}
                  </div>
                  <div>end time: {dayjs(epic.end).format("YYYY-MM-DD")}</div>
                </div>
              }
            />
            <div>
              {tasks
                ?.filter((task) => task.epicId === epic.id)
                .map((task) => (
                  <Link
                    to={`/projects/${currentProject?.id}/kanban?editingTaskId=${task.id}`}
                    key={task.id}
                  >
                    {task.name}
                  </Link>
                ))}
            </div>
          </List.Item>
        )}
      />
      <CreateEpic
        onClose={() => setEpicCreateOpen(false)}
        visible={epicCreateOpen}
      />
    </ScreenContainer>
  );
};
