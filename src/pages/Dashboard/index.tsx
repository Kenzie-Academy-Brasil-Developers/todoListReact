import { useEffect, useState } from "react"

import { Header } from "../../components/Header";
import { ModalAddTask } from "../../components/ModalAddTask";
import { Card } from "../../components/Card";

import { api } from "../../services/api";

import { CreateTaskData } from "./validator";

import { Board, Container, Main } from "./styles";

export interface Task extends Pick<CreateTaskData, 'description' | 'title'> {
  id: string;
  status: string;
}

export const Dashboard = () => {
  const [isOpenModel, setIsOpenModal] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    (async () => {
      const response = await api.get<Task[]>('tasks');

      setTasks(response.data)
    })()
  }, []);

  const todoTasks = tasks.filter(task => task.status === 'toDo');
  const inProgressTasks = tasks.filter(task => task.status === 'inProgress');
  const inRevisionTasks = tasks.filter(task => task.status === 'inRevision');
  const finishedTasks = tasks.filter(task => task.status === 'finished');

  const createTodo = async (data: CreateTaskData) => {
    const response = await api
      .post<Task>('/tasks', { ...data, status: 'toDo' })

    setTasks([response.data, ...tasks])
  }

  const updateTask = async (newTask: Task) => {
    const newTasks = tasks.map((task) => {
      if (task.id === newTask.id) return newTask
      return task;
    })

    setTasks(newTasks)
  }

  const closeModal = () => setIsOpenModal(!isOpenModel);

  const renderBoard = (tasksToRender: Task[]) =>
    tasksToRender.map(task => (
      <Card key={task.id} task={task} updateTask={updateTask} />
    ))

  return (
    <Container>
      <Header>
        <button
          type="button"
          onClick={closeModal}
        >
          NEW
        </button>
      </Header>

      {
        isOpenModel && (
          <ModalAddTask
            createTodo={createTodo}
            closeModal={closeModal}
          />
        )
      }

      <Main>
        <Board>{renderBoard(todoTasks)}</Board>
        <Board>{renderBoard(inProgressTasks)}</Board>
        <Board>{renderBoard(inRevisionTasks)}</Board>
        <Board>{renderBoard(finishedTasks)}</Board>
      </Main>
    </Container>
  )
}