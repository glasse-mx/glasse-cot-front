import { Box, Checkbox, Typography } from '@mui/material'

export const OrderApproval = ({order}) => {
  return (
    <Box
        display="flex"
        justifyContent="center"
        gap="10px"
        sx={{
            "& > div span": {
                color: '#29b6f6 !important'
            }
        }}
    >
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
        >
            <Checkbox checked={order.pdv_approval} color='info' disabled />
            <Typography>
                Gerente PDV
            </Typography>
        </Box>

        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
        >
            <Checkbox checked={order.assitant_approval} color='info' disabled />
            <Typography>
                Asist. de Dirección
            </Typography>
        </Box>

        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
        >
            <Checkbox checked={order.head_approval} color='info' disabled />
            <Typography>
                Tesorería
            </Typography>
        </Box>

        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
        >
            <Checkbox checked={order.ceo_approval} color='info' disabled />
            <Typography>
                Dirección General
            </Typography>
        </Box>
        
    </Box>
  )
}
