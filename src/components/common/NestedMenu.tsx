import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Collapse, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { MenuBase, MenuItemBase } from 'types/components/menu';

interface NestedMenuProps {
  menu: (MenuBase | MenuItemBase)[];
}

interface MenuProps {
  entry: MenuBase;
}

interface MenuItemProps {
  entry: MenuItemBase;
}

const Menu: React.FC<MenuProps> = ({ entry }) => {
  const [open, setOpen] = useState(entry.expanded);
  const Icon = entry.icon !== null ? entry.icon : React.Fragment;
  const hasChildren = entry.children.length > 0;

  const handleClick = () => {
    if (hasChildren) {
      setOpen(open => !open);
    }
  };

  return (
    <>
      <ListItem button={hasChildren as any} onClick={handleClick}>
        {entry.icon !== null && (
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
        )}
        <ListItemText>{entry.text}</ListItemText>
        {hasChildren && (open ? <ExpandLess /> : <ExpandMore />)}
      </ListItem>
      {hasChildren && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <NestedMenu menu={entry.children} />
        </Collapse>
      )}
      {hasChildren && <Divider />}
    </>
  );
};

const MenuItem: React.FC<MenuItemProps> = ({ entry }) => {
  const history = useHistory();
  const Icon = entry.icon !== null ? entry.icon : React.Fragment;

  const handleClick = () => {
    history.push(entry.to);
  };

  return (
    <ListItem button onClick={handleClick}>
      {entry.icon !== null && (
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
      )}
      <ListItemText>{entry.text}</ListItemText>
    </ListItem>
  );
};

const NestedMenu: React.FC<NestedMenuProps> = ({ menu }) => {
  return (
    <List disablePadding>
      {menu.map(entry =>
        'children' in entry ? (
          <Menu entry={entry} key={entry.id} />
        ) : (
          <MenuItem entry={entry} key={entry.id} />
        )
      )}
    </List>
  );
};

export default NestedMenu;
