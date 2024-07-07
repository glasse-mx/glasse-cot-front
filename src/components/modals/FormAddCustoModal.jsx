import { Modal, Box, Typography, Button } from "@mui/material"
import AssistantIcon from '@mui/icons-material/Assistant'
import { useState } from "react"
import { FormCustom } from "../forms";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "75%",
  maxWidth: "800px",
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '10px',
  p: 4,
};

export const FormAddCustoModal = ({order, setOrder}) => {

    const [isAddingCustom, setIsAddingCustom] = useState(false)

  return (
    <>
        <Button
            variant="contained"
            color="info"
            onClick={() => setIsAddingCustom(true)}
        >
            <AssistantIcon />
            Producto Personalizado
        </Button>

        <Modal
            open={isAddingCustom}
            onClose={() => setIsAddingCustom(false)}
        >
            <Box sx={style}>
                <Typography
                    variant="h3"
                    mb='30px'
                    textAlign="center"
                >
                    <AssistantIcon />
                    Agrega un Producto Personalizado
                </Typography>

                <FormCustom 
                    order={order} 
                    setOrder={setOrder} 
                    closeModal={setIsAddingCustom} 
                />
            </Box>
        </Modal>
    </>
  )
}
