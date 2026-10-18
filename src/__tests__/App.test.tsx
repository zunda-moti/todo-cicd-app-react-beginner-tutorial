import { describe, test, expect } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import App from "../App";

describe("App", () => {

    test("アプリタイトルが表示されている", () => {
        render(<App />);
        expect(
            screen.getByRole("heading", { name: "Todoアプリ!" })
        ).toBeDefined();
    });
    test("TODOを追加することができる", () => {
        render(<App />);
        const input = screen.getByRole("textbox", { name: "新しいタスクを入力" });
        const addButton = screen.getByRole("button", { name: "追加" });
        fireEvent.change(input, { target: { value: "テストタスク" } });
        fireEvent.click(addButton);

        const list = screen.getByRole("list");
        expect(within(list).getByText("テストタスク")).toBeInTheDocument();
    });
    test("TODOを完了することができる", () => {
        render(<App />);
        const input = screen.getByRole("textbox", { name: "新しいタスクを入力" });
        const addButton = screen.getByRole("button", { name: "追加" });
        fireEvent.change(input, { target: { value: "テストタスク" } });
        fireEvent.click(addButton);

        const checkbox = screen.getAllByRole("checkbox")[0];
        fireEvent.click(checkbox);

        expect(checkbox).toBeChecked();
    });
    test("完了しているTODOの数が表示されている", () => {
        render(<App />);
        const input = screen.getByRole("textbox", { name: "新しいタスクを入力" });
        const addButton = screen.getByRole("button", { name: "追加" });
        fireEvent.change(input, { target: { value: "テストタスク" } });
        fireEvent.click(addButton);
        fireEvent.change(input, { target: { value: "テストタスク2" } });
        fireEvent.click(addButton);

        const checkbox = screen.getAllByRole("checkbox")[0];
        fireEvent.click(checkbox);

        expect(screen.getByText("完了済み: 1 / 2")).toBeInTheDocument();
    });
    test("TODOがない時に「タスクがありません 新しいタスクを追加してください」と表示される", () => {
        render(<App />);
        expect(screen.getByText("タスクがありません")).toBeInTheDocument();
        expect(screen.getByText("新しいタスクを追加してください")).toBeInTheDocument();

    });
    test("空のTODOが追加されない", () => {
        render(<App />);
        const input = screen.getByRole("textbox", { name: "新しいタスクを入力" });
        const addButton = screen.getByRole("button", { name: "追加" });
        fireEvent.change(input, { target: { value: "テストタスク" } });
        fireEvent.change(input, { target: { value: "" } });
        fireEvent.click(addButton);

        expect(screen.getByText("タスクがありません")).toBeInTheDocument();
        expect(screen.getByText("新しいタスクを追加してください")).toBeInTheDocument();

    });

})