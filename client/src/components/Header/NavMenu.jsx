import React from 'react';
import {Link as RouterLink} from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";


function ListItemLink(props) {
  const { primary, to } = props;

  const renderLink = React.useMemo(
    () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

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
        <List>
            {links.map((item) => (
                <ListItemLink key={item.title}
                              to={item.path}
                              primary={item.title}/>
            ))}
        </List>
    )
};

export default NavMenu;