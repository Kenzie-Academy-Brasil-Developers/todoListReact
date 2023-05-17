import { ChangeEvent } from "react"

import { Task } from "../../pages/Dashboard"

import { api } from "../../services/api"

import { Container } from "./styles"

interface CardProps {
  task: Task;
  updateTask: (task: Task) => void
}

export const Card = ({ task, updateTask }: CardProps) => {
  const updateStatus = async (event: ChangeEvent<HTMLSelectElement>) => {
    const response = await api
      .patch(`tasks/${task.id}`, { status: event.target.value })

    updateTask(response.data);
  }

  return (
    <Container>
      {task.title}

      <select onChange={updateStatus} defaultValue={task.status}>
        <option value="toDo">to Do</option>
        <option value="inProgress">in Progress</option>
        <option value="inRevision">in Revision</option>
        <option value="finished">finished</option>
      </select>
    </Container>
  )
}