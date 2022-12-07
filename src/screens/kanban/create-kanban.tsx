import { useState } from "react";
import { Container } from "./kanban-column";
import { Input } from "antd";
import { useAddKanban } from "../../utils/kanban";
import { useKanbanQueryKey, useProjectIdInUrl } from "./util";

export const CreateKanban = () => {
  const [name, setName] = useState("");
  const { mutateAsync: addKanban } = useAddKanban(useKanbanQueryKey());
  const projectId = useProjectIdInUrl();
  const submit = async () => {
    await addKanban({ name, projectId });
    setName("");
  };

  return (
    <Container>
      <Input
        placeholder={"kanban name"}
        value={name}
        onPressEnter={submit}
        onChange={(evt) => setName(evt.target.value)}
      />
    </Container>
  );
};
