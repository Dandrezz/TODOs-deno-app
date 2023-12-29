import { Handlers } from "$fresh/server.ts";
import { loadTodos, createTodo, updateTodo, deleteTodo } from "../../shared/db.ts";

export const handler: Handlers = {
  async GET(){
    const todos = await loadTodos();
    return new Response(JSON.stringify(todos));
  },
  async POST(){
    const todo = await createTodo();
    return new Response(JSON.stringify(todo));
  },
  async PUT(request){
    const todo = await request.json();
    const lastTodo = await updateTodo(todo);
    return new Response(JSON.stringify(lastTodo));
  },
  async DELETE(request){
    const todo = await request.json();
    await deleteTodo(todo);
    return new Response();
  }
};
