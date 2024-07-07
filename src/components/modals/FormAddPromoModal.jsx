import { Modal, Box, Typography, Button } from '@mui/material'
import DiscountIcon from '@mui/icons-material/Discount'
import { useState } from 'react'
import { FormPromo } from '../forms';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "60%",
  maxWidth: "800px",
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '10px',
  p: 4,
};

export const FormAddPromoModal = ({ order, setOrder }) => {

    const [isAddingPromo, setIsAddingPromo] = useState(false)


  return (
    <>
    <Button
        variant="contained"
        color="info"
        onClick={() => setIsAddingPromo(true)}
    >
        <DiscountIcon />
        Agregar Promo
    </Button>

    <Modal
        open={isAddingPromo}
        onClose={() => setIsAddingPromo(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
            <Typography 
                variant="h3" 
                mb="30px"
                textAlign="center"
            >
                <DiscountIcon />
                Agregar Promocion / Descuento
            </Typography>
            <Box
                display="flex"
                height="250px"
                justifyContent="center"
            >
                <img 
                    src={`../../assets/discount.png`} 
                    alt="Imagen de Descuento" 
                />
            </Box>
            <FormPromo order={order} setOrder={setOrder} setIsAddingPromo={setIsAddingPromo} />
        </Box>
    </Modal>

    
    </>
  )
}
