import { useState } from 'react'
import { Box, Typography, TextField } from '@mui/material'

export const ObservationsBlock = ({ order, setOrder}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="15px"
      p="15px"
    >
        <Typography
          variant='h5'
        >
            Observaciones
        </Typography>

        <TextField
          id="outlined-multiline-static"
          label="Observaciones"
          multiline
          rows={4}
          value={order.observaciones}
          onChange={(e) => setOrder({ ...order, observaciones: e.target.value })}
        />
    </Box>
  )
}
