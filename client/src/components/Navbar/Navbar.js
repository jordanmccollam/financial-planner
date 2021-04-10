import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Row, Col, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Logo } from '../index'

import './_navbar.scss';

const logger = "Navbar:: ";

const CustomNavbar = (props) => {
  let classes = {
		[`navbar`]: true
	};

  return (
    <Navbar bg="light" expand="lg" fixed="top" className={`${props.className} ${classnames(classes)}`}>
      <Navbar.Brand href="#home"><Logo size="sm" /></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <NavDropdown title={`Signed in as ${props.user.nickname}`} id="basic-nav-dropdown">
            <NavDropdown.Item onClick={props.signout} >Sign Out</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

CustomNavbar.propTypes = {
  className: PropTypes.string,
  signout: PropTypes.func,
  user: PropTypes.object
}

CustomNavbar.defaultProps = {
  className: "",
  signout: () => console.log(logger + 'signout'),
  user: {nickname: 'USER'}
}

export default CustomNavbar;


