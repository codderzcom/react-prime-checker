import React from 'react';
import {Navigate, Outlet, useNavigate} from "react-router";
import {useAuth} from "../hooks/useAuth.ts";
import {AppBar, Button, Container, CssBaseline, Toolbar, Typography} from "@mui/material";

const MainLayout = () => {
  const {isAuthenticated} = useAuth();
  const {logout} = useAuth();
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace/>;
  }

  return (
    <>
      <CssBaseline/>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            Prime Checker
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{mt: 4, mb: 4}}>
        <Outlet/>
      </Container>
    </>
  );
};

export default MainLayout;