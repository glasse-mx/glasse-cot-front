import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import { Link } from "react-router-dom"
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from "react-router-dom";
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

export const Topbar = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const colorMode = useContext(ColorModeContext)
    const navigate = useNavigate()

    const user = useAuthUser()

    // SignOut Method
    const signOut = useSignOut()

    const handleSignOut = () => {
        signOut()
        navigate('/login')
    }
    
    return (
     <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
     >
        {/* Search Bar */}
        {/* <Box
            display="flex"
            backgroundColor={colors.primary[400]}
            borderRadius="3px"
        >   
            <InputBase
                placeholder="Search"
                sx={{
                    ml:2,
                    flex: 1
                }}
            />
            <IconButton type="button" sx={{ p:1 }}>
                <SearchIcon />
            </IconButton>
        </Box> */}

        {/* Topbar Icons */}    
        <Box display="flex">

            {/* Boton de Cambio de Tema */}
            <IconButton onClick={colorMode.toggleColorMode}>
                {
                    theme.palette.mode === "dark" ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )
                }
            </IconButton>

            {/* Boton de Notificaciones - No implementado aun, se comenta */}
            {/* <IconButton>
                <NotificationsOutlinedIcon />
            </IconButton> */}

            {/* Boton de Configuracion - No implementado aun, se comenta */}
            {/* <IconButton>
                <SettingsOutlinedIcon />
            </IconButton> */}

            {/* Boton de Perfil de usuario */}
            <Link to={`/profile/${user.id}`}>
                <IconButton>
                    <PersonOutlinedIcon />
                </IconButton>
            </Link>
            
            {/* Boton de Cerrar Sesion */}
            <IconButton onClick={handleSignOut}>
                <ExitToAppIcon />
            </IconButton>
            
        </Box>


     </Box>
    )
}
