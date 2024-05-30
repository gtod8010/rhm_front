import React, { useContext, useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Home, Keyboard, Settings, AssignmentInd } from '@mui/icons-material';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../login/UserContext';

const useStyles = makeStyles((theme) => ({
  sidebar: {
    width: 250,
    backgroundColor: '#333',
    height: '100%',
    color: '#fff',
  },
  icon: {
    color: '#fff',
  },
  listItemText: {
    color: '#fff',
  },
}));

const Sidebar = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [role, setRole] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.role) {
      setRole(storedUser.role);
    }
  }, [user]);

  return (
    <Box className={classes.sidebar}>
      <List>
        {role === 'admin' && (
          <ListItem button>
            <ListItemIcon className={classes.icon}><Home /></ListItemIcon>
            <ListItemText primary="공지사항" classes={{ primary: classes.listItemText }} />
          </ListItem>
        )}
        <ListItem button onClick={() => navigate('/reward')}>
          <ListItemIcon className={classes.icon}><Keyboard /></ListItemIcon>
          <ListItemText primary="리워드" classes={{ primary: classes.listItemText }} />
        </ListItem>
        {role === 'admin' && (
          <ListItem button onClick={() => navigate('/member')}>
            <ListItemIcon className={classes.icon}><AssignmentInd /></ListItemIcon>
            <ListItemText primary="회원 관리" classes={{ primary: classes.listItemText }} />
          </ListItem>
        )}
        {role === 'admin' && (
          <ListItem button>
            <ListItemIcon className={classes.icon}><Settings /></ListItemIcon>
            <ListItemText primary="설정" classes={{ primary: classes.listItemText }} />
          </ListItem>
        )}
      </List>
      <Divider />
    </Box>
  );
};

export default Sidebar;
