// app/login/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import {isAuthenticated} from '../../utils/Auth';
import { useLayoutEffect } from 'react';

const Login: React.FC = () => {
  const router = useRouter(); // Використання useRouter для маршрутизації
  const [username, setUsername] = useState('user@my.com');
  const [password, setPassword] = useState('1234');


  const handleRegisteration = async () => {

    router.push('/registeration');
  }
  // const t = useTranslations();


  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Перешкоджаємо перезавантаженню сторінки

    try {
      if(username  === "user@my.com"){
        if(password === '1234'){
         localStorage.setItem('user', username)
        }else{
          alert("no go - pass")
        }
      }else{
        alert("no go - user name")
      }
      const token = localStorage.getItem('user') 
      if (token === "user@my.com") {
        router.push('/customer'); // Перенаправлення на dashboard після успішного логіну
      }
    } catch (error) {
      console.error('Login failed:', error); // Обробка помилок
    }
  };

  return (

    <>
      <Button sx={{float:'right'}} variant="outlined" onClick={handleRegisteration}>
        Регістрація
        {/* {t('logout.Logout')} */}
      </Button>
      <Container maxWidth="sm">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <Typography variant="h2" component="h2" gutterBottom>
            Login
          </Typography>

          <form onSubmit={handleLogin}>
            <TextField
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="text"
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: '16px' }}
            >
              Login
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default Login;  
