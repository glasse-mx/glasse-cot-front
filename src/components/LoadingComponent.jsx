import { Box, useTheme } from "@mui/material"
import { tokens } from "../theme"
import { CircularProgress } from '@mui/material'

export const LoadingComponent = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
    >
        <CircularProgress 
          color="info"
        />
    </Box>
  )
}

export default LoadingComponent
