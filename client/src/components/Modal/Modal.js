import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Row, Col, Modal } from 'react-bootstrap';
import { Button } from '../index'

import './_modal.scss';

const logger = "Modal:: ";

const CustomModal = (props) => {
  let classes = {
		[`custom-modal`]: true
	};

  const handleClose = () => { props.setShow(false) }
  const handleShow = () => { props.setShow(true) }

  return (
    <Modal show={props.show} onHide={handleClose} className={`${props.className} ${classnames(classes)}`}>
      <Modal.Header closeButton >
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body >
        {props.children}
      </Modal.Body>
    </Modal>
  )
}

CustomModal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  className: PropTypes.string,
  show: PropTypes.bool,
  setShow: PropTypes.func,
  title: PropTypes.string,
}

CustomModal.defaultProps = {
  className: "",
  children: "Default Modal Content",
  show: false,
  setShow: () => console.log(logger + 'setShow'),
  title: 'Default Modal',
}

export default CustomModal;


