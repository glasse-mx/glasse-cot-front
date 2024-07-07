import { Modal, Box, Typography, Button, TextField } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit'
import { useState, useEffect } from "react"
import { coinFormat } from '../../utils'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "50%",
  maxWidth: "700px",
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '10px',
  p: 4,
}

export const FormProductEditModal = ({ order, setOrder, product }) => {

    const [open, setOpen] = useState(false)
    const [ prod, setProd ] = useState(product)
    // console.log(prod)

    useEffect(() => {
        setProd({
            ...prod,
            subtotal: parseFloat(prod.price) * parseInt(prod.cant)
        })
    }, [prod.cant])

  return (
    <>
        <Button
            variant="contained"
            color="info"
            onClick={() => setOpen(true)}
        >
            <EditIcon />      
        </Button>

        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography
                    id="modal-modal-title"
                    variant="h3"
                    component="h3"
                    sx={{
                        textAlign: 'center',
                        mb: 2,
                        textTransform: 'uppercase'
                    }}
                >
                    <EditIcon />
                    Editar Producto
                </Typography>

                <Box
                    height="250px"
                    display="flex"
                    justifyContent="center"
                    m="10px 0"
                >
                    <img   
                        src={
                            product.img 
                            ? product.img 
                            : `../../assets/custom-prod.png`
                        } 
                        alt="Imagen de producto" 
                    />
                </Box>

                <Box>
                    <Box>
                        <Typography
                            variant="h4"
                            textAlign="center"
                        >
                            {product.name}
                        </Typography>
                    </Box>
                    
                    <Box
                        display="flex"
                        gap="10px"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Typography>
                            <b>Precio Unitario:</b> {coinFormat(parseFloat(product.price))}
                        </Typography>

                        <TextField
                            id="qty"
                            label="Cantidad"
                            variant="outlined"
                            name="qty"
                            type="number"
                            value={prod.cant}
                            onChange={(e) => setProd({
                                ...prod,
                                cant: e.target.value
                            })}
                            min={1}
                            inputProps={{
                                min: 1,
                                max: 10
                            }}
                        />
                    </Box>

                    <Typography
                        textAlign="center"
                        m="10px 0"
                    >
                        <b>Subtotal de Producto: </b> {coinFormat(parseFloat(prod.subtotal))}
                    </Typography>

                    <Box
                        display="flex"
                        justifyContent="center"
                        m="20px"
                    >
                        <Button
                            variant="contained"
                            color="info"
                            onClick={() => {
                                if ( order.productos.find( prod => prod.id === product.id ) ) {
                                    setOrder({
                                        ...order,
                                        productos: order.productos.map( item => {
                                            if ( item.id === product.id ) {
                                                return {
                                                    ...item,
                                                    cant: parseInt(prod.cant) ,
                                                    subtotal: parseFloat(prod.subtotal) 
                                                    
                                                }
                                            } 
                                        })
                                    })
                                    
                                } else {
                                    setOrder({
                                        ...order,
                                        productos: [...order.productos, prod]
                                    })
                                        
                                }
                                setOpen(false)
                            }}
                        >
                            Agregar
                        </Button>
                    </Box>

                </Box>
            </Box>
        </Modal>
    </>

    
  )
}
