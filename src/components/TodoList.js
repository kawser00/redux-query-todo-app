import React from 'react'
import { useSelector } from 'react-redux';
import { useGetTodosQuery } from '../features/apiSlice';
import Todo from './Todo'
import Error from './ui/Error';

export default function TodoList() {
  const { data: todos, isLoading, isError } = useGetTodosQuery();

  const sortedTodos = todos?.slice().sort((a, b) => b.id - a.id);
  const completedTodos = sortedTodos?.filter(todo => todo.completed);
  const inCompletedTodos = sortedTodos?.filter(todo => !todo.completed);

  const { status, colors } = useSelector((state) => state.filters);

  const filterByStatus = (todo) => {
    switch (status) {
      case 'Complete':
        return todo.completed;
      case 'Incomplete':
        return !todo.completed;
      default:
        return true;
    }
  }

  const filterByColor = (todo) => {
    if (colors.length === 0) return true;
    return colors.includes(todo.color);
  }

  let content = null;
  if (isLoading) content = <div>Loading...</div>
  if (!isLoading && isError) {
    content = <Error message='There was an error occurred!' />;
  }
  if (!isLoading && !isError && inCompletedTodos?.length === 0) {
    content = <h2 className="flex items-center justify-center text-emerald-500 font-bold">
      <svg className="fill-white stroke-current w-5 h-5 text-green-500 pointer-events-none mr-1" viewBox="0 0 24 24" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
      All tasks completed
    </h2>;
  }
  if (!isLoading && !isError && inCompletedTodos?.length > 0) {
    content = inCompletedTodos
      .filter(filterByStatus)
      .filter(filterByColor)
      .map((todo) => <Todo key={todo.id} todo={todo} />);
  }

  return (
    <div
      className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto"
    >
      {todos?.length === 0 ?
        <div className="flex items-center justify-center text-gray-500 font-bold">No todos available!!</div> :
        <>{content}</>
      }
      {
        completedTodos?.length > 0 && status !== 'Incomplete' && (
          <>
            <h1 className="mt-5 mb-2 text-lg font-semibold">
              Completed tasks
            </h1>
            {
              completedTodos
                .filter(filterByStatus)
                .filter(filterByColor)
                .map((todo) => <Todo key={todo.id} todo={todo} taskCompleted />)
            }
          </>
        )
      }
    </div>
  )
}
