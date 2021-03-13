import React, { useState, useEffect } from "react";
import { Navbar, Nav, Form, NavDropdown, FormControl, Button, Dropdown } from 'react-bootstrap';
import { GiTakeMyMoney } from 'react-icons/gi';

const logger = "Navbar";

const CustomNav = (props) => {
  const { children, className } = props;

  return (
    <Navbar className={`${className} navbar`} bg="light" expand="lg">
      <Navbar.Brand href="#home" className="heading-05">Financial Planner <GiTakeMyMoney size={30}/></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Dropdown className="navbar-dropdown ml-auto">
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            *Active Sheet*
          </Dropdown.Toggle>

          <Dropdown.Menu className="pb-0 navbar-dropdown-menu">
            <Dropdown.Item >*Other Sheet*</Dropdown.Item>
            <Dropdown.Item >*Other Sheet*</Dropdown.Item>
            <Dropdown.Item className="px-0 pb-0" ><Button className="dropdown-btn" variant="outline-primary">New</Button></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default CustomNav;


