import { useNavigate } from "react-router-dom";
import { Modal } from "../Modal";

interface ModalProps {
  closeModal: () => void;
}

export const ModalError = ({ closeModal }: ModalProps) => {
  const navigate = useNavigate();

  const handleCloseAndRedirect = () => {
    closeModal();
    navigate('/')
  }

  return (
    <Modal blockClosing callback={closeModal}>
      <p>
        Você não está autorizado!
      </p>

      <button onClick={handleCloseAndRedirect}>Ir para o login</button>
    </Modal>
  )
}