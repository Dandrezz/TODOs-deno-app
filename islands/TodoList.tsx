import { useEffect, useState } from 'preact/hooks'
import { TodosProps } from "../interfaces/ITodos.ts";
import { loadTodos, createTodo, updateTodo } from "../shared/db.ts";

const URL_API = 'http://localhost:8000/api/todos-api'

const TodoList = () => {

    const [todos, setTodos] = useState<TodosProps[]>([])

    const fetchTodos = async () => {
        const res = await fetch(URL_API,
        {
            method: "GET",
            headers: {"Content-type": "application/json;charset=UTF-8"}
        })
        const data = await res.json()
        const DTOdata = data.map((todo: TodosProps)=>({
            id: todo.id,
            nombre: todo.nombre,
            estado: todo.estado,
        }))
        return DTOdata
    }

    useEffect(() => {
        fetchTodos().then(data=>setTodos(data))
    }, [])

    const handleAddClick = async () => {
        fetch(URL_API,
            {
                method: "POST",
                headers: {"Content-type": "application/json;charset=UTF-8"},
            }).then(data => data.json()).then(data => {
                setTodos([...todos, {
                    id: data.id,
                    nombre: data.nombre,
                    estado: data.estado,
                    editable: data.editable
                }])
            })
    }

    const handleEditClick = (id: string) => {
        const todo = todos.find(todo => todo.id === id)
        if(todo?.editable) {
            fetch(URL_API,
            {
                method: "PUT",
                headers: {"Content-type": "application/json;charset=UTF-8"},
                body: JSON.stringify(todo)
            })
        }
        setTodos(todos.map(todo => {
            return todo.id === id ? { ...todo, editable: !todo.editable } : todo
        }))
    }

    const handleRemoveClick = (id: string) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const handleChangeStatus = (id: string) => {
        setTodos(todos.map(todo => {
            return todo.id === id ? { ...todo, estado: !todo.estado } : todo
        }))
    }

    const handleEditTextChange = (id: string, value: string) => {
        setTodos(todos.map(todo => {
            return todo.id === id ? { ...todo, nombre: value } : todo
        }))
    }

    return (
        <>
            <div className="flex justify-between items-center">
                <h1 className="text-2xl">Table</h1>
                <button
                    onClick={handleAddClick}
                    className='bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mb-4 ml-auto'>Añadir</button>
            </div>

            <div className='not-prose relative bg-slate-50 rounded-xl overflow-hidden dark:bg-slate-800/25'>
                <div className='relative rounded-xl overflow-auto bg-[#121b2e]'>
                    <div className='shadow-sm overflow-hidden my-8 '>
                        <table className='border-collapse table-fixed w-full text-center'>
                            <thead className='bg-[#121b2e]'>
                                <tr className=''>
                                    <th className='py-2'>#</th>
                                    <th className='py-2'>Nombre de la tarea</th>
                                    <th className='py-2'>Estatus</th>
                                    <th className='py-2'>Editar</th>
                                    <th className='py-2'>Remover</th>
                                </tr>
                            </thead>
                            <tbody className='bg-[#1e293b] text-[#94a3b8]'>
                                {
                                    todos.map((todo, index) => (
                                        <tr key={index}>
                                            <td className='py-2'>
                                                {index + 1}
                                            </td>
                                            <td className='py-2'>
                                                {
                                                    todo.editable ? <input
                                                        onChange={(e) => handleEditTextChange(todo.id, e.target?.value)}
                                                        value={todo.nombre}
                                                        className='w-full text-black text-center' type="text" /> :
                                                        todo.nombre
                                                }
                                            </td>
                                            <td className='py-2'>
                                                {
                                                    todo.editable ? <button
                                                        onClick={() => handleChangeStatus(todo.id)}
                                                        className={`${todo.estado ? 'bg-green-500' : 'bg-orange-500'} font-bold py-2 px-4 rounded text-white`} defaultValue={todo.nombre} >{todo.estado ? 'Completado' : 'Pendiente'}</button> :
                                                        todo.estado ? 'Completado' : 'Pendiente'
                                                }
                                            </td>
                                            <td className='py-2'>
                                                <button className={`${todo.editable ? 'bg-green-500 hover:bg-green-700' : 'bg-sky-500 hover:bg-sky-700'} text-white font-bold py-2 px-4 rounded`}
                                                    onClick={() => handleEditClick(todo.id)}>{todo.editable ? 'Guardar' : 'Editar'}</button>
                                            </td>
                                            <td className='py-2'>
                                                <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                                                    onClick={() => handleRemoveClick(todo.id)}>Remover</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TodoList