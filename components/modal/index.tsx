import ReactDOM from 'react-dom';
import Overlay from './Overlay';
import Wrapper from './Wrapper';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  closeModal: () => void;
}

export function Modal({ children, isOpen, closeModal }: ModalProps) {
  const closeHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    closeModal();
  };
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <Overlay onClick={closeHandler}>
      <Wrapper>{children}</Wrapper>
    </Overlay>,
    document.getElementById('modal-root') as HTMLElement,
  );
}
