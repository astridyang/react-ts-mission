import { Link } from "react-router-dom";
import { Routes, Navigate, Route, useLocation } from "react-router";
import { KanbanScreen } from "../kanban";
import { MissionScreen } from "../mission";
import styled from "@emotion/styled";
import { Menu } from "antd";

const useRouteType = () => {
  const units = useLocation().pathname.split("/");
  return units[units.length - 1];
};
export const ProjectScreen = () => {
  const menuItems = [
    {
      icon: <Link to={"kanban"}>kanban</Link>,
      key: "kanban",
    },
    {
      icon: <Link to={"epic"}>epic</Link>,
      key: "epic",
    },
  ];
  const routeType = useRouteType();
  return (
    <Container>
      <Aside>
        <Menu items={menuItems} selectedKeys={[routeType]} />
      </Aside>
      <Main>
        <Routes>
          <Route path={"kanban"} element={<KanbanScreen />} />
          <Route path={"epic"} element={<MissionScreen />} />
          <Route
            path={"/"}
            element={
              <Navigate
                to={window.location.pathname + "/kanban"}
                replace={true}
              />
            }
          />
        </Routes>
      </Main>
    </Container>
  );
};
const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  width: 100%;
`;
const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  background-color: rgb(244, 245, 247);
`;
const Main = styled.div`
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  overflow: hidden;
`;
