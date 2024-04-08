import { ITodo } from "../Todo";

const API_URL = import.meta.env.VITE_API_URL;

class ApiService {
  fetchTodos = async () => {
    try {
      const response = await fetch(`${API_URL}/todo`);
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  markComplete = async (id: string, isChecked: boolean) => {
    try {
      await fetch(`${API_URL}/todo/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: isChecked }),
      });
    } catch (error) {
      console.error("Error marking todo as complete:", error);
    }
  };

  deleteTodo = async (id: string) => {
    try {KeyboardEvent
      await fetch(`${API_URL}/todo/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  editTodo = async (todo: ITodo, newTitle: string) => {
    try {
      await fetch(`${API_URL}/todo/${todo._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTitle, completed: todo.completed }),
      });
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };

  addTodo = async (todo: ITodo) => {
    try {
      await fetch(`${API_URL}/todo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };
}

export default new ApiService();
