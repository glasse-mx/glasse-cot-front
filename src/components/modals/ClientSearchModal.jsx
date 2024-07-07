import { Modal, Box, Typography, TextField, Button, CircularProgress } from "@mui/material"
import { useEffect, useState } from "react"
import axios from "axios"
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { ClientSearchModalChild } from "./ClientSearchModalChild";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '10px',
  p: 4,
};

export const ClientSearchModal = ({ open, set, order, setOrder, setClientInfo }) => {

  const authHeader = useAuthHeader();

  const [ searchValue, setSearchValue ] = useState('')
  const [ childOpen, setChildOpen ] = useState(false)
  const [ loading, setLoading ] = useState(false)

  const [ clients, setClients ] = useState([])


  const handleSearchClient = (e) => {
    e.preventDefault()
    setLoading(true)

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/clients/search=${searchValue}`,
      headers: { 
        'Authorization': authHeader
      },
      data: ''
    };

    axios.request(config)
    .then((response) => {
      setLoading(false)
      setClients(response.data)   
    })
    .catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    setChildOpen(true)
  }, [clients])


  return (
    <Modal
        open={open}
        onClose={() => set(false)}
        aria-labelledby="modal-modal-title"
    >
        <Box sx={style}>
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
              Buscar Cliente
            </Typography>

            <Box
              display="flex"
              gap="10px"
              sx={{
                "& form": {
                  display: 'flex',
                  gap: '10px',
                  width: '100%'
                }
              }}
            >
              <form onSubmit={handleSearchClient}>
                <TextField
                  id="outlined-basic"
                  label="Buscar"
                  variant="outlined"
                  name="searchValue"
                  required
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />

                <Button
                  variant="contained"
                  color="info"
                  type="submit"
                >
                  <PersonSearchIcon />
                  Buscar
                </Button>
              </form>

            </Box>

            {
              loading && 
                <Box
                  display="flex"
                  justifyContent="center"
                  mt="20px"
                >
                  <CircularProgress color='info'/>
                </Box>
            }

            { clients.length > 0 && 
              <ClientSearchModalChild 
                open={childOpen}
                set={() => setChildOpen(false)}
                clients={clients.length > 0 ? clients : []}
                order={order}
                setOrder={setOrder}
                setClientInfo={setClientInfo}
                close={() => set(false)}
              />
            }
            
        </Box>
    </Modal>
  )
}
