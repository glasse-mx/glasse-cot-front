import { Modal, Box, Typography, Button, CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "50%",
  maxWidth: "800px",
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '10px',
  p: 4,
}

export const OrderNewVentaModal = ({order, error, setError, totalPago}) => {

    const [ open, setOpen ] = useState(false)
    const [ loading, setLoading ] = useState(false)

    const authHeader = useAuthHeader()
    const navigate = useNavigate()
    const appUser = useAuthUser()
    

    const handleSetToventa = (e) => {

        e.preventDefault()
        setLoading(true)

        if (order.id_cliente === 0 || order.productos.length === 0 || !order.detalles_envio.tipo || order.total != totalPago.total) {
            setError({
                ...error,
                clientError: order.id_cliente === 0 ? true : false,
                productError: order.productos.length === 0 ? true : false,
                shippingError: !order.detalles_envio.tipo ? true : false,
                totalError: order.total != totalPago.total ? true : false,
            })
            setLoading(false)
            setOpen(false)
            return
        }

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/orders/${order.id}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authHeader,
            },
            data: {
                ...order,
                edited_by: appUser.id,
            }
        };

        axios.request(config)
        .then((response) => {
            setLoading(false)
            navigate(`/notas-venta/${order.id}`)
        })
        .catch((error) => {
            console.log(error);
        });
    }

  return (
    <>
        <Button
            variant="contained"
            color="success"
            onClick={() => setOpen(true)}
        >
            CONVERTIR EN VENTA
            <AttachMoneyIcon />
        </Button>

        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>

                <Box
                    display="flex"
                    justifyContent="center"
                    sx={{
                        "& svg": {
                            fontSize: "5rem",
                            color: "yellow"
                        }
                    }}
                >
                    <NewReleasesIcon />
                </Box>

                <Typography 
                    id="modal-modal-title" 
                    variant="h3" 
                    component="h3"
                    sx={{
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        textAlign: 'center'
                    }}
                >
                    Atencion          
                </Typography>

                <Typography
                    id="modal-modal-description"
                    sx={{
                        textAlign: 'center',
                        mt: "20px",
                        fontSize: "1.25rem"
                    }}
                >
                    Esta apunto de crear una Nota de Venta <br /> A partir de este folio <br /> ¿Desea Continuar?
                </Typography>

                {
                    loading
                    ? (
                        <Box
                            display="flex"
                            justifyContent="center"
                            sx={{
                                mt: "20px",
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    
                    ) : (
                        <Box
                            display="flex"
                            justifyContent="center"
                            m="20px 0"
                            gap="15px"
                        >
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => setOpen(false)}
                            >
                                Volver
                            </Button>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={handleSetToventa}
                            >
                                Aceptar
                                <CheckCircleOutlineIcon />
                            </Button>
                        </Box>
                    )
                }
            </Box>

        </Modal>
    </>
  )
}
