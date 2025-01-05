import React from "react";
import ReactDOM from "react-dom";
import './Modal.css';


interface ModalStates extends React.PropsWithChildren {
    isOpen: boolean; onClose: () => void
}

const Modal: React.FC<ModalStates> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>,
        document.getElementById("modal-root")!
    );
};

export default Modal;