import { ChangeEvent } from 'react';
import { ITodo } from '../Todo';

interface Props {
  todo: ITodo;
  handleOnMarkComplete: (id: string, isChecked: boolean) => void;
  handleOnUpdate: (todo: ITodo, newTitle: string) => void;
  handleOnDelete: (id: string) => void;
}

const Item = ({ todo, handleOnMarkComplete, handleOnUpdate, handleOnDelete }: Props) => {
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleOnMarkComplete(todo._id as unknown as string, e.target.checked);
  };

  const handleEditClick = () => {
    const newTitle = prompt('Enter new title:', todo.title) || '';
    handleOnUpdate(todo, newTitle);
  };

  return (
    <li className="flex justify-between py-4">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleCheckboxChange}
          className="form-checkbox h-4 w-4 text-indigo-600"
        />
        <span className={`ml-2 ${todo.completed ? 'line-through' : ''}`}>{todo.title}</span>
      </div>
      <div className="flex space-x-2 ml-10">
        <button
          onClick={() => handleOnDelete(todo._id as unknown as string)}
          className="text-red-600 hover:text-red-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height={24}
            width={24}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            x="0px"
            y="0px"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
        </button>
        <button
          onClick={handleEditClick}
          className="text-blue-600 hover:text-blue-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height={24}
            width={24}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
            >
            <path d="M16.59 3L21 7.41 17.41 11l-4.42-4.41L16.59 3zM5.71 15.88l2.83 2.83-4.24 1.41 1.41-4.24zM18.31 6.28l-1.83 1.83-6.47-6.47 1.83-1.83c.78-.78 2.05-.78 2.83 0l3.64 3.64c.78.78.78 2.05 0 2.83z" />
        </svg>

        </button>
      </div>
    </li>
  );
};

export default Item;
