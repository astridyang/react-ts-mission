import { ProjectListScreen } from "./screens/project-list";
import { useAuth } from "./context/auth-context";
import styled from "@emotion/styled";
import { ButtonNoPadding, Row } from "./components/lib";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Button, Dropdown, Menu } from "antd";
import { Routes, Route, Navigate } from "react-router";
import { ProjectScreen } from "./screens/project";
import { resetRoute } from "./utils";
import { ProjectPopover } from "./components/project-popover";
import { ProjectModal } from "./screens/project-list/project-modal";
import { UserPopover } from "./components/user-popover";

export default () => {
  return (
    <Container>
      <Header />
      <Main>
        <Routes>
          <Route path={"/projects"} element={<ProjectListScreen />} />
          <Route path={"/projects/:projectId/*"} element={<ProjectScreen />} />
          <Route path={"/"} element={<Navigate to={"/projects"} />} />
        </Routes>
      </Main>
      <ProjectModal />
    </Container>
  );
};

const Header = () => {
  const { user, logout } = useAuth();
  const menuItems = [
    {
      key: "logout",
      icon: (
        <Button type={"link"} onClick={logout}>
          Logout
        </Button>
      ),
    },
  ];
  return (
    <PageHeader between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type={"link"} onClick={resetRoute}>
          <SoftwareLogo width={"18rem"} color={"rgb(38,132,255)"} />
        </ButtonNoPadding>
        <ProjectPopover />
        <UserPopover />
      </HeaderLeft>
      <HeaderRight>
        <Dropdown overlay={<Menu items={menuItems} />}>
          <Button type={"link"} onClick={(event) => event.preventDefault()}>
            Hi, {user?.name}
          </Button>
        </Dropdown>
      </HeaderRight>
    </PageHeader>
  );
};

// 暂时性死区
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;
const PageHeader = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main`
  //height: calc(100vh - 6rem);
  display: flex;
  overflow: hidden;
`;
