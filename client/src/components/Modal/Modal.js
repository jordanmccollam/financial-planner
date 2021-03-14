import React, { useState, useEffect } from "react";
import { Row, Col, Modal } from 'react-bootstrap';

const logger = "Modal:: ";

const CustomModal = (props) => {
  const { children, className, show, setShow, title } = props;

  return (
    <Modal className={`${className} modal`} show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          {title && (
            <Modal.Title className="text-primary">{title}</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body className="pb-4">
          {children}
        </Modal.Body>
    </Modal>
  )
}

export default CustomModal;


