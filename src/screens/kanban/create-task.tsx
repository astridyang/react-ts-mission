import { useProjectIdInUrl, useTasksQueryKey } from "./util";
import { useState } from "react";
import { useAddTask } from "../../utils/task";
import { Card, Input } from "antd";

export const CreateTask = ({ kanbanId }: { kanbanId: number }) => {
  const projectId = useProjectIdInUrl();
  const [name, setName] = useState("");
  const [inputMode, setInputMode] = useState(false);
  const { mutateAsync: addTask } = useAddTask(useTasksQueryKey());

  const submit = async () => {
    await addTask({ name, projectId, kanbanId });
    setName("");
    setInputMode(false);
  };

  const toggle = () => setInputMode(!inputMode);

  if (!inputMode) {
    return <div onClick={toggle}>+ create task</div>;
  }
  return (
    <Card>
      <Input
        placeholder={"what do you want to do"}
        autoFocus={true}
        onBlur={toggle}
        value={name}
        onPressEnter={submit}
        onChange={(evt) => setName(evt.target.value)}
      />
    </Card>
  );
};
