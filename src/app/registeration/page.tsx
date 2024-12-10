'use client';
import React, { useState } from 'react';
import { Container, TextField, Button, Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';


const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Імітація відповіді, замість реального API запиту
      const response = 'success'; // Тестова відповідь
      if (response) {
        router.push('/dashboard');
        alert('Registration successful!');
      }
    } catch (error) {
      alert('Registration problem');
    }
  };

  
  const handleLogin = async () => {

    router.push('/');
  };

  return (

    <>
      <Button sx={{ float: 'right' }} variant="outlined" onClick={handleLogin}>
       Авторизація
        {/* {t('logout.Logout')} */}
      </Button>
      <Container maxWidth="sm" >
        <Box  display="flex" flexDirection="column" alignItems="center" minHeight="100vh" >
     
          <Box sx={{marginTop: '200px'}} component="form" onSubmit={handleRegister} display="flex" flexDirection="column" gap={2} width="600px">
          <Typography sx={{textAlign:'center'}}  variant="h4" component="h2" gutterBottom>
            Register
          </Typography>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
            />
            <Button variant="contained" type="submit" fullWidth>
              Register
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Register;
