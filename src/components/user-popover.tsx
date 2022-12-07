import { Popover } from "antd";
import { List } from "antd";
import styled from "@emotion/styled";
import { useUsers } from "../utils/users";

export const UserPopover = () => {
  const { data: users } = useUsers();
  const content = (
    <ContentContainer>
      {users?.map((user) => (
        <List.Item key={user.id}>
          <List.Item.Meta title={user.name} />
        </List.Item>
      ))}
    </ContentContainer>
  );
  return (
    <Popover placement={"bottom"} content={content}>
      <span>User</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
