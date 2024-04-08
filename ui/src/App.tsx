// src/App.tsx
import React from 'react';
import TodoList from './components/Todo';

const App: React.FC = () => {
  return (
    <div className=" border border-white p-5 rounded-xl">
        <h1 className="text-3xl font-bold mb-4">Todo List</h1>
        <TodoList />
    </div>
  );
}

export default App;
