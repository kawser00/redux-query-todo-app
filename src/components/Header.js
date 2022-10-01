import React, { useState } from 'react';
import noteImage from '../assets/images/notes.png';
import plusImage from '../assets/images/plus.png';
import tickImage from '../assets/images/double-tick.png';
import { useAddTodoMutation, useDeleteTodoMutation, useGetTodosQuery, useUpdateTodoMutation } from '../features/apiSlice';
import Error from './ui/Error';

export default function Header() {
  const [input, setInput] = useState('');

  const [addTodo, { isLoading, isError }] = useAddTodoMutation();
  const { data: todos } = useGetTodosQuery();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    addTodo({
      text: input,
      completed: false,
    });
    setInput('');
  }

  const handleCompleteAllTasks = () => {
    todos?.map((todo) => updateTodo({
      id: todo.id,
      data: {
        completed: true,
      }
    }));
  }

  const handleClearCompletedTasks = () => {
    const completedTodos = todos?.filter((todo) => todo.completed);
    completedTodos?.map((todo) =>  deleteTodo(todo.id));
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex items-center bg-gray-100 px-4 py-4 rounded-md"
      >
        <img
          src={noteImage}
          className="w-6 h-6"
          alt="Add todo"
        />
        <input
          type="text"
          placeholder="Type your todo"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full text-lg px-4 py-1 border-none outline-none bg-gray-100 text-gray-500"
        />
        <button
          disabled={isLoading}
          type="submit"
          className={`appearance-none w-8 h-8 bg-[url(${plusImage})] bg-no-repeat bg-contain`}
        ></button>
      </form>

      <ul className="flex justify-between my-4 text-xs text-gray-500">
        <li onClick={handleCompleteAllTasks} className="flex space-x-1 cursor-pointer">
          <img
            className="w-4 h-4"
            src={tickImage}
            alt="Complete"
          />
          <span>Complete All Tasks</span>
        </li>
        <li onClick={handleClearCompletedTasks} className="cursor-pointer">Clear completed</li>
      </ul>

      {!isLoading && isError && (
        <Error message='There was an adding todo!' />
      )}
    </div>
  )
}
