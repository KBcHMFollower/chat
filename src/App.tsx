import React from 'react';
import { LogInPage } from './pages/LogInPage/LogInPage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Box, Container, Paper } from '@mui/material';
import { useAppSelector } from './hooks/redux';

function App() {

  const id = useAppSelector(state => state.user.id);

  return (
    <BrowserRouter>
      <Box sx={{backgroundColor:'black', height:'100vw'}}>
        <Container>
          <Paper elevation={8}>
            <Routes>
              {id === -1 && (
                <>
                  <Route path='/login' element={<LogInPage />} />
                  <Route path='*' element={<Navigate to={'/login'} replace />} />
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
