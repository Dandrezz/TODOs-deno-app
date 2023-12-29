import * as uuid from "https://deno.land/std@0.207.0/uuid/mod.ts";
import { TodosProps } from "../interfaces/ITodos.ts";

const db = await Deno.openKv();

export async function loadTodos() {
  const out: TodosProps[] = [];
  const todos = await db.list({ prefix: ["todos"] });
  for await (const todo of todos) {
    out.push(todo.value);
  }
  return out;
}

export async function createTodo(): Promise<TodosProps> {
  const todo: TodosProps = {
    id: uuid.v1.generate(),
    nombre: "Tarea Ejemplo",
    estado: false,
    editable: false,
  };
  await db.set(["todos", todo.id], todo);
  return todo;
}

export async function updateTodo(todo: TodosProps): Promise<TodosProps> {
  await db.set(["todos", todo.id], todo);
  return todo;
}

export async function deleteTodo(todo: TodosProps): Promise<void> {
  await db.delete(["todos", todo.id]);
}
