import { createPortal } from "react-dom";
import { Container } from "./styles";
import { ReactNode } from "react";
import { useOutClick } from "../../hooks/useOutClick";

interface ModalProps {
  children: ReactNode;
  callback: () => void;
  blockClosing?: boolean;
}

export const Modal = ({ children, callback, blockClosing}: ModalProps) => {
  const ref = useOutClick(callback);

  return createPortal(
    <Container>
      <div ref={blockClosing ? null : ref}>
        {children}
      </div>
    </Container>,
    document.body
  )
}