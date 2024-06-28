import React from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "../backdrop";

import "./modal.css";

const ModalOverlay = ({
  onSubmit,
  modalClass,
  style,
  header,
  headerClass,
  contentClass,
  footerClass,
  footer,
  ...props
}) => {
  return (
    <div className={`modal ${modalClass}`} style={style}>
      <header className={`modal__header ${headerClass}`}>
        <h2>{header}</h2>
      </header>
      <form onSubmit={onSubmit ? onSubmit : (e) => e.preventDefault()}>
        <div className={`modal__content ${contentClass}`}>{props.children}</div>
      </form>
      <footer className={`modal__footer ${footerClass}`}>{footer}</footer>
    </div>
  );
};

const Modal = ({ show, onCancel, ...props }) => {
  const content = (
    <>
      {show && <Backdrop onClick={onCancel} />}
      <CSSTransition
        in={show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal">
        <ModalOverlay {...props} />
      </CSSTransition>
    </>
  );
  return createPortal(content, document.getElementById("modal-hook"));
};

export default Modal;
