import { render, screen } from "@testing-library/react";
import { Mark } from "../components/mark";

test("Mark can highlight keyword correctly", () => {
  const name = "materials management";
  const keyword = "management";

  render(<Mark name={name} keyword={keyword} />);
  expect(screen.getByText(keyword)).toBeInTheDocument();
  expect(screen.getByText(keyword)).toHaveStyle("color: #257afd");
  expect(screen.getByText("materials")).not.toHaveStyle("color: #257afd");
});
