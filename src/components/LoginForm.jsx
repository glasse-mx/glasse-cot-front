import {
  Box,
  TextField,
  IconButton,
  InputAdornment,
  Button,
  CircularProgress,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import useSignIn from "react-auth-kit/hooks/useSignIn";

const LoginForm = () => {
  const navigate = useNavigate();
  const signIn = useSignIn();

  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [islogginIn, setIslogginIn] = useState(false);

  const handleLoginInput = (event) => {
    setAuthData({
      ...authData,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIslogginIn(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_BASE_URL}/auth/login`, authData)
      .then((response) => {
        if (response.status === 200) {
          if (
            signIn({
              auth: {
                token: response.data.access_token.token,
                type: response.data.token_type,
              },
              userState: response.data.access_token.user,
            })
          ) {
            console.log("login success");
            navigate("/");
          }

          setIslogginIn(false);
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setError(true);
        }
        setIslogginIn(false);
      });
  };

  return (
    <Box
      maxWidth='600px'
      margin={"auto"}
      padding={"1rem"}
      backgroundColor={"rgba(0,0,0,.5)"}
    >
      {islogginIn ? (
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          height='200px'
          width='300px'
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <form onSubmit={handleLogin}>
            <TextField
              name='email'
              label='Email'
              variant='outlined'
              type='email'
              margin='normal'
              fullWidth
              onChange={handleLoginInput}
              error={error}
              helperText={error.email ? error.email[0] : null}
            />
            <TextField
              name='password'
              label='Password'
              variant='outlined'
              margin='normal'
              fullWidth
              type={showPassword ? "text" : "password"}
              onChange={handleLoginInput}
              error={error}
              helperText={error && "Los datos suministrados son incorrectos"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button variant='contained' color='primary' fullWidth type='submit'>
              Iniciar sesion
            </Button>
          </form>
        </Box>
      )}
    </Box>
  );
};

export default LoginForm;
