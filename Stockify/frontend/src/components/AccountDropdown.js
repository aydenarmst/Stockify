import React from 'react';
import { ListItem, ListItemText, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function AccountDropdown() {
    const Navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <ListItem button onClick={handleClick}>
                <ListItemText primary="Account" />
            </ListItem>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => Navigate('/login')}>Login</MenuItem>
                <MenuItem onClick={() => Navigate('/logout')}>Logout</MenuItem>
                <MenuItem onClick={() => Navigate('/register')}>Register</MenuItem>
            </Menu>
        </div>
    );
}

export default AccountDropdown;