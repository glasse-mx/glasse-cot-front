import { Box, Typography, useTheme } from '@mui/material'
import { tokens } from '../../theme'
import LoginForm from "../../components/LoginForm"
import Logo from '../../assets/logo-app-large.png'
import BackGround from '../../assets/login-bg.jpg'

const Login = () => {



  return (
    <Box
      display="grid"
      gridTemplateColumns={{ sm: '1fr', md: '400px auto' }}
      height="100vh"
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="1rem"
        padding="2rem"
        height="100vh"
      >
        <img 
          src={Logo} 
          alt="Ciampi Product" 
        />

        <Box>
          <LoginForm />
        </Box>
        
        <Typography
          textAlign="center"
          mt="2rem"
        >
          @2024 - Creado por <a href="https://gabecode.com">@GabeCode</a> - Gabriel Coronado - Todos los derechos reservados
        </Typography>
      </Box>

      <Box
        display={{ sm: 'none', md: 'flex' }}
        alignItems='center'
        justifyContent='center'
        overflow='hidden'
      >
        <img 
          src={BackGround} 
          alt="Ciampi Product" 
        />
      </Box>
    </Box>
  )
}

export default Login