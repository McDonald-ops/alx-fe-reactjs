import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "./TodoList";

describe("TodoList Component", () => {
  test("renders initial todos", () => {
    render(<TodoList />);
    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Build a Todo App")).toBeInTheDocument();
  });

  test("can add a new todo", () => {
    render(<TodoList />);

    const input = screen.getByPlaceholderText("Enter a new todo");
    const addButton = screen.getByText("Add Todo");

    fireEvent.change(input, { target: { value: "Write Tests" } });
    fireEvent.click(addButton);

    expect(screen.getByText("Write Tests")).toBeInTheDocument();
  });

  test("can toggle a todo as completed", () => {
    render(<TodoList />);

    const todoItem = screen.getByText("Learn React");
    fireEvent.click(todoItem);

    expect(todoItem).toHaveClass("line-through");
  });

  test("can delete a todo", () => {
    render(<TodoList />);

    const todoText = "Build a Todo App";
    const deleteButton = screen.getAllByText("Delete")[1]; // delete second todo

    fireEvent.click(deleteButton);

    // re-query the DOM after deletion
    expect(screen.queryByText(todoText)).not.toBeInTheDocument();
  });
});
