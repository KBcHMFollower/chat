import React, { useState } from 'react';
import { LogInPage } from './pages/LogInPage/LogInPage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Avatar, Box, Button, Collapse, Container, Paper } from '@mui/material';
import { useAppSelector } from './hooks/redux';
import { ChatsPage } from './pages/ChatsPage/ChatsPage';
import { stringAvatar } from './services/avatar-services';
import { Header } from './components/Header/Header';
import { MessagesPage } from './pages/MessagesPage/MessagesPage';

function App() {

  const user = useAppSelector(state => state.user);



  return (
    <BrowserRouter>
      <Box sx={{ backgroundColor: 'black', minHeight: '100vh', width:'100vw' }}>
        {user.id !==-1 && <Header user={user}/>}
        <Container>
          <Paper sx={{backgroundColor:'#D8DBDD'}} elevation={8}>
            <Routes>
              {user.id === -1 ? (
                <>
                  <Route path='/login' element={<LogInPage />} />
                  <Route path='*' element={<Navigate to={'/login'} replace />} />
                </>
              ) : (
                <>
                  <Route path='/messages' element={<ChatsPage user = {user}/>} />
                  <Route path='/messages/:userId' element={<MessagesPage user = {user}/>} />
                  <Route path='*' element={<Navigate to={'/messages'} replace />} />
                </>
              )}
            </Routes>
          </Paper>
        </Container>
      </Box>
    </BrowserRouter>
  );
}

export default App;
