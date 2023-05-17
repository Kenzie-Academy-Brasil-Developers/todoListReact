import { useForm } from "react-hook-form"
import { CreateTaskData, schema } from "../../pages/Dashboard/validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { Modal } from "../Modal";

interface ModalProps {
  createTodo: (data: CreateTaskData) => void;
  closeModal: () => void;
}

export const ModalAddTask = ({ createTodo, closeModal }: ModalProps) => {
  const { register, handleSubmit } = useForm<CreateTaskData>({
    resolver: zodResolver(schema)
  })

  return (
    <Modal callback={closeModal}>
      <form onSubmit={handleSubmit(createTodo)}>
        <label htmlFor="title">Titulo</label>
        <input type="text" id="title" {...register('title')} />

        <label htmlFor="description">Descrição</label>
        <textarea id="description" {...register('description')} />

        <button type="submit">Cadastrar</button>
      </form>
    </Modal>
  )
}