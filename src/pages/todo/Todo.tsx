import React, { useState, useEffect } from "react";
import { Plus, Trash2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Todo {
  id: number;
  text: string;
  duration: number;
}

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [newDuration, setNewDuration] = useState("");
  const [totalDuration, setTotalDuration] = useState(0);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    const storedTotalDuration = localStorage.getItem("totalDuration");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
    if (storedTotalDuration) {
      setTotalDuration(JSON.parse(storedTotalDuration));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    const newTotal = todos.reduce((sum, todo) => sum + todo.duration, 0);
    setTotalDuration(newTotal);
    localStorage.setItem("totalDuration", JSON.stringify(newTotal));
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() !== "" && newDuration.trim() !== "") {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: newTodo,
          duration: parseInt(newDuration, 10),
        },
      ]);
      setNewTodo("");
      setNewDuration("");
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <Card className="w-auto m-5">
      <CardHeader>
        <CardTitle>아침에 할 일들</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={addTodo} className="space-y-4">
          <div className="flex space-x-2">
            <Input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new todo"
              className="flex-grow"
            />
            <Input
              type="number"
              value={newDuration}
              onChange={(e) => setNewDuration(e.target.value)}
              placeholder="Time (min)"
              className="w-40"
            />
          </div>
          <Button type="submit" className="w-full">
            <Plus className="w-4 h-4 mr-2" /> Add Todo
          </Button>
        </form>
        <ul className="mt-4 space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between p-2 bg-secondary rounded-md"
            >
              <div>
                <span className="font-medium">{todo.text}</span>
                <span className="ml-2 text-sm text-muted-foreground">
                  ({todo.duration} min)
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteTodo(todo.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </li>
          ))}
        </ul>
        <div className="mt-4 pt-4 border-t flex items-center justify-between text-foreground">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            <span>아침 준비 시간 함계 :</span>
          </div>
          <span className="font-medium">{totalDuration} 분</span>
        </div>
      </CardContent>
    </Card>
  );
}
