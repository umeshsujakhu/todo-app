import { useState, useEffect, KeyboardEvent } from 'react';
import apiService from "../service/api";
import { ITodo } from '../Todo';
import Item from './Item';
import { click } from '../utils/sfx';

const TodoList = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');

  const fetchAll = async () => {
    const todos = await apiService.fetchTodos();
    setTodos(todos);
  }

  useEffect(() => {
    fetchAll();
  }, []);

  const handleAddTodo = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter" && newTodoTitle.trim() !== "") {
      await apiService.addTodo({ title: newTodoTitle, completed: false });
      setNewTodoTitle('');
      click();
      fetchAll();
    }
  }

  const handleOnMarkComplete = async (id: string, isChecked: boolean) => {
    await apiService.markComplete(id, isChecked);
    click();
    fetchAll();
  }

  const handleOnUpdate = async (todo: ITodo, newTitle: string) => {
    await apiService.editTodo(todo, newTitle);
    click();
    fetchAll();
  }

  const handleOnDelete = async (id: string) => {
    await apiService.deleteTodo(id);
    click();
    fetchAll();
  }

  return (
    <div className="max-w-lg mx-auto">
       <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Enter new todo"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          className="w-3/4 p-2 border border-gray-300 rounded"
          onKeyDown={handleAddTodo}
        />
      </div>
      <ul className="divide-y divide-gray-200">
        {todos.map(todo => (
          <Item
            key={todo._id}
            todo={todo}
            handleOnMarkComplete={handleOnMarkComplete}
            handleOnUpdate={handleOnUpdate}
            handleOnDelete={handleOnDelete}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
