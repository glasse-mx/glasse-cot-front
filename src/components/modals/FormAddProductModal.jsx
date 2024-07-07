import { Modal, Box, Typography, TextField, Button } from '@mui/material'
import Inventory2Icon from '@mui/icons-material/Inventory2'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { useState } from 'react'
import { FormProducts } from '../forms';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 1050,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '10px',
  p: 4,
};

export const FormAddProductModal = ({ order, setOrder }) => {
  
  const [isAddingProduct, setIsAddingProduct] = useState(false)

  return (
    <>
        <Button
            variant="contained"
            color="info"
            onClick={() => setIsAddingProduct(true)}
        >
            <Inventory2Icon />
            Agregar Producto
        </Button>

        <Modal
          open={isAddingProduct}
          onClose={() => setIsAddingProduct(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h3"
              component="h3"
              mb="20px"
              sx={{
                textAlign: 'center',
                fontWeight: 'bold',
                textTransform: 'uppercase',
              }}
            >
              Agregar Producto
            </Typography>
            <FormProducts order={order} setOrder={setOrder} modal={setIsAddingProduct} />
            <Box
              display="flex"
              justifyContent="center"
              m="25px 0 10px"
            >
              <Button
                variant='contained'
                color="success"
                onClick={() => setIsAddingProduct(false)}
                endIcon={<AssignmentTurnedInIcon />}
              >
                Listo 
              </Button>
            </Box>
          </Box>
        </Modal>
    </>
  )
}
