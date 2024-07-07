import { Modal, Box, Typography, Button } from "@mui/material"
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import { useEffect, useState } from "react"
import { FormShipping } from "../forms";

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

export const FormAddShippingModal = ({ order, setOrder }) => {

    const [isAddingShipping, setIsAddingShipping] = useState(false)
    const [ clientInfo, setClientInfo ] = useState({})

  return (
    <>
        <Button
            variant="contained"
            color="success"
            onClick={() => setIsAddingShipping(true)}
        >
            <LocalShippingIcon />
            Agregar Envio
        </Button>

        <Modal
            open={isAddingShipping}
            onClose={() => setIsAddingShipping(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography 
                    variant="h3" 
                    mb="30px"
                    textAlign="center"
                >
                    <LocalShippingIcon />
                    Agregar Envio
                </Typography>
                
                <Box
                    display="flex"
                    justifyContent="center"
                    height="250px"
                >
                    <img src={`../../assets/shipping.png`} alt="" />
                </Box>

                <FormShipping order={order} setOrder={setOrder} setIsAddingShipping={setIsAddingShipping}/>
            </Box>
        </Modal>
    </>
  )
}
