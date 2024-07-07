import { Modal, Box, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
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

export const OrderAppovalModal = ({order, setError}) => {

    const [ open, setOpen ] = useState(false)
    const [ loading, setLoading ] = useState(false)

    const authHeader = useAuthHeader()
    const navigate = useNavigate()
    const appUser = useAuthUser()

    const handleApproveOrder = () => {
       
        setLoading(true)
        let config ={
            method: 'put',
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/orders/${order.id}/approval`,
            headers:{
                'Content-Type': 'application/json',
                'Authorization': authHeader,
            },
            data: {
                user_id: appUser.id
            }
        }

        axios(config)
            .then(res => {
                setLoading(false)
                setOpen(false)
            })
            .catch(err => {
                setLoading(false)
                setOpen(false)
            })
    }


  return (
    <>
        <Button
            variant="contained"
            color="success"
            onClick={() => setOpen(true)}  
        >
            Aprobar Nota
            <CheckCircleIcon />
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
                        fontSize: "1.1rem"
                    }}
                >
                    Esta apunto de Aprobar esta Nota <br /> Esta accion es irreversible <br /> ¿Desea Continuar?
                </Typography>

                {
                    loading ? (
                        <Box
                            display="flex"
                            justifyContent="center"
                            sx={{
                                mt: "20px"
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "1.1rem"
                                }}
                            >
                                Aprobando Nota...
                            </Typography>
                        </Box>
                    ) : (
                        <Box
                            display="flex"
                            justifyContent="center"
                            sx={{
                                mt: "20px"
                            }}
                        >
                            <Button
                                variant="contained"
                                color="success"
                                onClick={handleApproveOrder}
                            >
                                Aprobar Nota
                                <CheckCircleIcon />
                            </Button>
                        </Box>
                    )
                }
            </Box>

        </Modal>
    </>
  )
}
