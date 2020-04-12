import React from 'react';
import {NavLink} from "react-router-dom";
import {Pane, Button} from "evergreen-ui";

import './NavMenu.css';


const NavMenu = () => {

    const links = [
        {
            title: 'Главная',
            path: '/'
        },
        {
            title: 'Категории',
            path: '/categories'
        },
    ];

    return (
        <Pane
            minWidth={150}
            paddingRight={24}>
            {links.map(link => (
                <Button key={link.title} width='100%' appearance='minimal' display='flex' paddingX={0}>
                    <NavLink
                        className='nav-menu__item'
                        exact
                        to={link.path}>
                        {link.title}
                    </NavLink>
                </Button>
            ))}
        </Pane>
    )
};

export default NavMenu;