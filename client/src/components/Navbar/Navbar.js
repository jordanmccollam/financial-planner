import React, { useState, useEffect } from "react";
import { Navbar, Nav, Form, NavDropdown, FormControl, Button, Dropdown } from 'react-bootstrap';
import { GiTakeMyMoney } from 'react-icons/gi';

const logger = "Navbar";

const CustomNav = (props) => {
  const { children, className, user } = props;

  return (
    <Navbar className={`${className} navbar px-5`} bg="light" expand="lg">
      <Navbar.Brand href="#home" className="heading-05">Financial Planner <GiTakeMyMoney size={30}/></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Dropdown className="navbar-dropdown ml-auto">
          <Dropdown.Toggle variant="outline-primary">
            {user.currentSheet ? user.currentSheet : "No Sheet Yet"}
          </Dropdown.Toggle>

          <Dropdown.Menu className="pb-0 navbar-dropdown-menu">
            {user.sheets?.map((sheet, index) => (
              <Dropdown.Item key={`nav-dropdown-item-${index}`} >{sheet}</Dropdown.Item>
            ))}
            <Dropdown.Item className="px-0 pb-0" ><Button className="dropdown-btn" variant="outline-primary" disabled>New</Button></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default CustomNav;


