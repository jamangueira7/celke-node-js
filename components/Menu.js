import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap';

function Menu() {
    return (
        <div>
            <a href="/">Home</a><br />
            <a href="/orcamento">Orçamento</a><br />
        </div>
    );
}

export default Menu;
