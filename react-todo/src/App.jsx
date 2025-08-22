import React from "react";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-[#233038] mb-6">
          Todo List App
        </h1>
        <TodoList />
      </div>
    </div>
  );
}

export default App;
