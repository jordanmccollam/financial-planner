import React, { useState, useEffect } from "react";
import { Navbar, Nav, Form, NavDropdown, FormControl, Button, Dropdown } from 'react-bootstrap';
import { GiTakeMyMoney } from 'react-icons/gi';

const logger = "Navbar:: ";

const CustomNav = (props) => {
  const { children, className, user, signOut } = props;

  return (
    <Navbar className={`${className} navbar px-5`} bg="light" expand="lg">
      <Navbar.Brand className="heading-05">Financial Planner <GiTakeMyMoney size={30}/></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Dropdown className="navbar-dropdown ml-auto">
          <Dropdown.Toggle variant="outline-primary">
            Signed in as {user.nickname}
          </Dropdown.Toggle>

          <Dropdown.Menu className="pb-0 navbar-dropdown-menu">
            <div onClick={signOut} className="dropdown-btn clear-btn py-2">Sign Out</div>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default CustomNav;


