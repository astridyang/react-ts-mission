import { setupServer } from "msw/node";
import { rest } from "msw";
import fakeData from "./fake.json";
import { ReactNode } from "react";
import { AppProviders } from "../context";
import { render, screen, waitFor } from "@testing-library/react";
import { ProjectListScreen } from "../screens/project-list";
import { Pin } from "../components/pin";

const apiUrl = process.env.REACT_APP_API_URL;

const fakeAuth = {
  id: 1,
  name: "bb",
  token: "123",
};

const server = setupServer(
  rest.get(`${apiUrl}/me`, (req, res, ctx) => {
    console.log(fakeAuth);
    return res(ctx.json(fakeAuth));
  }),
  rest.get(`${apiUrl}/users`, (req, res, ctx) => {
    return res(ctx.json(fakeData.users));
  }),
  rest.get(`${apiUrl}/projects`, (req, res, ctx) => {
    const { name = "" } = Object.fromEntries(req.url.searchParams);
    const result = fakeData?.projects?.filter((project) => {
      return project.name.includes(name);
    });
    return res(ctx.json(result));
  })
);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

const waitTable = () => {
  return waitFor(
    () => expect(screen.getByText("骑手管理")).toBeInTheDocument(),
    {
      timeout: 3000,
    }
  );
};

test("project list render correctly", async () => {
  renderScreen(<ProjectListScreen />, { route: "/projects" });
  await waitTable();
  expect(screen.getAllByRole("row").length).toBe(fakeData.projects.length + 1);
});

test("project search", async () => {
  renderScreen(<ProjectListScreen />, { route: "/projects?name=骑手" });
  await waitTable();
  expect(screen.getAllByRole("row").length).toBe(2);
  expect(screen.getByText("骑手管理")).toBeInTheDocument();
});

export const renderScreen = (ui: ReactNode, { route = "/projects" } = {}) => {
  window.history.pushState({}, "test page", route);
  return render(<AppProviders>{ui}</AppProviders>);
};
