import React, {useState} from 'react';
import {Box, Button, Stack, TextField, Typography} from "@mui/material";
import {useAuth} from "@/hooks/useAuth.ts";
import {useNavigate} from "react-router";
import Seeder from "@/components/Seeder.tsx";

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {login} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(username, password);

    if (success) {
      navigate('/');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <Stack alignItems='center' justifyContent='center' direction='column' height='100vh' py={3}>
      <Box component="form" onSubmit={handleSubmit} sx={{maxWidth: 500, px: 3}}>
        <Typography variant="h4" gutterBottom>Login</Typography>
        <TextField
          size="small"
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          data-testid="username"
        />
        <TextField
          size="small"
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          data-testid="password"
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" sx={{mt: 2}}>
          Login
        </Button>
      </Box>

      <Seeder/>
    </Stack>
  );
};

export default LoginPage;