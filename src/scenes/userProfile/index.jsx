import useAuthUser from "react-auth-kit/hooks/useAuthUser"
import { Box, Avatar } from "@mui/material"
import { deepOrange, deepPurple } from '@mui/material/colors';
import Header from "../../components/Header"

const UserProfile = () => {

    const userInfo = useAuthUser()
    const userInitials = userInfo.name.split(" ").map((n)=>n[0]).join("")

    console.log(userInitials)

  return (
    <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header 
            title={`Hola de nuevo ${useAuthUser().name}` }
            subtitle="Este es tu perfil de usuario"
            />
        </Box>

        <Box>
            <Box>
                <Avatar sx={{ bgcolor: deepOrange[500]}}>
                    {userInitials}
                </Avatar>
            </Box>
        </Box>

    </Box>
  )
}

export default UserProfile