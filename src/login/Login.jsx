import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { setLogin } from '../api/index';
import { TextField, Button, Container, Typography } from '@mui/material';
import { UserContext } from './UserContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const userInfo = await setLogin(username, password);
    setUser(userInfo); // 사용자 정보를 전역 상태에 저장
    navigate('/reward'); // 로그인 후 이동할 페이지
  } catch (error) {
    alert('Login failed');
  }
};

  return (
    <Container>
      <Typography variant="h4">Login</Typography>
      <form onSubmit={handleLogin}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
