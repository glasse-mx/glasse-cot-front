import { ColorModeContext, useMode } from './theme'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CssBaseline, ThemeProvider } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import Login from './scenes/login'
import AppBoard from './scenes/AppBoard'
import RequireAuth from '@auth-kit/react-router/RequireAuth';


function App() {

  const [ theme, colorMode ] = useMode()

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CssBaseline />
          <Routes>
            {/* <Route path='/*' element={<AppBoard />} /> */}
            <Route path='/login' element={<Login />} />
            <Route path='/*' element={
              <RequireAuth fallbackPath='/login'>
              <AppBoard />
            </RequireAuth>
            } />
          </Routes>
        </LocalizationProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
