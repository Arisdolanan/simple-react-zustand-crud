import React, { useRef } from "react";

const Modal = ({ isOpen, children }) => {
  const modalRef = useRef(null);
  const showHideClassName = isOpen ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main" ref={modalRef}>
        {children}
      </section>
    </div>
  );
};
export default Modal;
