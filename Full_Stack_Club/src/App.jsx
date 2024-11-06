import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import { v4 } from 'uuid';

function App() {
  // Persistencia de dados
  const[tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  // O useEffect é acionado quando houver alteração no elemento que está dentro de uma array, 
  // no caso é o tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(),
      title: title,
      description: description,
      isCompleted: false
    }
    setTasks([...tasks, newTask]);
  }

  function onTaskClick(taskId) {
    const newTask = tasks.map(task => {
      //PRECISO ATUALIZAR ESTA TAREFA
      if(task.id === taskId) {
        return {...task, isCompleted: !task.isCompleted}
      }

      //NÃO PRECISO ATUALIZAR ESTA TAREFA
      return task;
    });

    setTasks(newTask);
  }

  function deleteTask(taskId) {
    const updatedTask = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTask);
  }

  return(
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <h1 className="text-3xl text-slate-100 font-bold text-center">
          Gerenciador de Tarefas
        </h1>
        <AddTask onAddTaskSubmit={onAddTaskSubmit}/>
        <Tasks tasks={tasks} onTaskClick={onTaskClick} deleteTask={deleteTask} />
      </div>
    </div>
  );

}

export default App;