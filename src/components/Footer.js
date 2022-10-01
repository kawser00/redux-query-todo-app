import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useGetTodosQuery } from '../features/apiSlice';
import { setColor, setStatus } from '../features/filterSlice';

const numberOfTodos = (no_of_todos) => {
  switch (no_of_todos) {
    case 0:
      return 'No task';
    case 1:
      return '1 task';
    default:
      return `${no_of_todos} tasks`;
  }
}

export default function Footer() {
  const dispatch = useDispatch();
  const { data: todos } = useGetTodosQuery();
  const remainingTodos = todos?.filter(todo => !todo.completed).length;
  const { status, colors } = useSelector((state) => state.filters);

  const handleStatusChange = (status) => {
    dispatch(setStatus(status));
  }

  const handleColorChange = (color) => {
    if (colors.includes(color)) {
      dispatch(setColor({color, changeType:'removed'}));
    } else {
      dispatch(setColor({color, changeType:'added'}));
    }
  }

  return (
    <div className="mt-4 flex justify-between text-xs text-gray-500">
      <p>{numberOfTodos(remainingTodos)} left</p>
      <ul className="flex space-x-1 items-center text-xs">
        <li onClick={() => handleStatusChange('All')} className={`cursor-pointer ${status === 'All' && 'font-bold'}`}>All</li>
        <li>|</li>
        <li onClick={() => handleStatusChange('Incomplete')} className={`cursor-pointer ${status === 'Incomplete' && 'font-bold'}`}>Incomplete</li>
        <li>|</li>
        <li onClick={() => handleStatusChange('Complete')} className={`cursor-pointer ${status === 'Complete' && 'font-bold'}`}>Complete</li>
        <li></li>
        <li></li>
        <li
          className={`h-3 w-3 border-2 border-green-500 md:hover:bg-green-500 rounded-full cursor-pointer ${colors.includes('green') && 'bg-green-500'}`}
          onClick={() => handleColorChange('green')}
        ></li>
        <li
          className={`h-3 w-3 border-2 border-red-500 md:hover:bg-red-500 rounded-full cursor-pointer ${colors.includes('red') && 'bg-red-500'}`}
          onClick={() => handleColorChange('red')}
        ></li>
        <li
          className={`h-3 w-3 border-2 border-yellow-500 md:hover:bg-yellow-500 rounded-full cursor-pointer ${colors.includes('yellow') && 'bg-yellow-500'}`}
          onClick={() => handleColorChange('yellow')}
        ></li>
      </ul>
    </div>
  )
}
