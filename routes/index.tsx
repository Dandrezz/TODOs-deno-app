import TodoList from "../islands/TodoList.tsx";
import { Footer } from '../components/Footer.tsx'

export default function Home() {
  return (
    <main class="text-white font-extrabold w-full">
      <h1 class="sm:text-3xl text-slate-900 tracking-tight dark:text-slate-200 text-5xl text-center my-7">
        Todo List
      </h1>
      <TodoList className="mx-auto w-10/12 mb-24 [min-height:74vh]"/>
      <Footer/>
    </main>
  );
}
