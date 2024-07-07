import { Modal, Box, CircularProgress, Button, Typography } from '@mui/material'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

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
};

export const OrderCancelModal = ({order}) => {

    const authHeader = useAuthHeader()
    const appUser = useAuthUser()
    const navigate = useNavigate()

    const [ open, setOpen ] = useState(false)
    const [ loading, setLoading ] = useState(false)

    const handleCancelOrder = () => {

        setLoading(true)

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/orders/${order.id}/cancel`,
            headers: {
                'Authorization': authHeader
            }
        }

        axios.request(config)
            .then((res) => {
                setLoading(false)
                setOpen(false)
                navigate(`/notas-canceladas/${order.id}`)
            })
            .catch((err) => {
                console.error(err)
            })
    }

  return (
    <>
        <Button
            variant="contained"
            color="error"
            onClick={() => setOpen(true)}
        >
            Cancelar
            <DoDisturbIcon />
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
                            color: "error.main"
                        }
                    }}
                >
                    <WarningAmberIcon />
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
                    ¿Estas seguro que deseas cancelar la orden?
                </Typography>

                {
                    loading  
                     ? (<Box
                        display="flex"
                        justifyContent="center"
                        mt="20px"
                    >
                        <CircularProgress color='info'/>
                    </Box>)
                     : (
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
                                No
                            </Button>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={handleCancelOrder}
                            >
                                Si
                                <DeleteForeverIcon />
                            </Button>
                        </Box>
                     )
                }
            </Box>
        </Modal>
        
    </>
  )
}
