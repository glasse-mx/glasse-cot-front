import { Box, TextField, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoadingComponent from '../../components/LoadingComponent'
import Header from './../../components/Header'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import axios from 'axios';

export const ClientSingle = () => {

  let { id } = useParams() || null
  const authHeader = useAuthHeader();
  const [ loading, setLoading ] = useState(true)
  const [ isEditing, setIsEditing ] = useState(false)

  const initialClientValue = {
      first_name: '',
      last_name: '',
      phone: '',
      email: '',
      address_street: '',
      address_int: '',
      address_ext: '',
      address_col: '',
      address_town: '',
      address_state: '',
      address_zip: '',
  }

  const [clientData, setClientData] = useState(initialClientValue)
  const [ clientDataBK, setClientDataBK ] = useState(initialClientValue)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setClientData({ ...clientData, [name]: value })
  }

  useEffect(() => {
      
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/client/${id}`,
        headers: {
          'Authorization': authHeader
        }
      }
  
      axios.request(config)
        .then((res) => {
          setClientData(res.data)
          setClientDataBK(res.data)
          setLoading(false)
        })
        .catch((err) => {
          console.error(err)
        })
  }, [])

  const handleCancelEdit = () => {
    setClientData(clientDataBK)
    setIsEditing(false)
  }

  const handleEditClient = (e) => {
    e.preventDefault()

    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/client/${id}`,
      headers: {
        'Authorization': authHeader
      },
      data: clientData
    }

    axios.request(config)
      .then((res) => {
        setIsEditing(false)
      })
      .catch((err) => {
        console.error(err)
      })
  }


  return (
    <>
      { loading ? <LoadingComponent /> : ( 

        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header 
                title={`Cliente: ${clientData.first_name} ${clientData.last_name}`}
                subtitle={`Ve o edita los datos de ${clientData.first_name}`}
                />
            </Box>

            <Box
              display="flex"
              gap="15px"
              justifyContent={ isEditing && 'flex-end'}
            >
              {
                !isEditing && (
                  <Button 
                    variant="contained" 
                    onClick={() => setIsEditing(true)}
                    color='info'
                  >
                    Editar
                  </Button>
                )
              }

              {
                isEditing && (
                    <Button 
                      variant="contained" 
                      onClick={() => setIsEditing(false)}
                      color='error'  
                    >
                      Cancelar
                    </Button>
                )
              }
            </Box>

            <Box>
              <form>
                <Box
                  display="flex"
                  flexDirection="column"
                  gap="15px"
                >
                  <Box
                    display="grid"
                    gridTemplateColumns={{ sm: '1fr', md: 'repeat(2, 1fr)' }}
                    gap="15px"
                  >
                    <TextField 
                      name="first_name"
                      label="Nombres"
                      variant="outlined"
                      margin="normal"
                      value={clientData.first_name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      required
                    />
                    <TextField 
                      name="last_name"
                      label="Apellidos"
                      variant="outlined"
                      margin="normal"
                      value={clientData.last_name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      required
                    />
                  </Box>

                  <Box
                    display="grid"
                    gridTemplateColumns={{ sm: '1fr', md: 'repeat(2, 1fr)' }}
                    gap="15px"
                  >
                    <TextField
                      variant='outlined'
                      label='Telefono'
                      name='phone'
                      value={clientData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      required
                    />
                    <TextField
                      variant='outlined'
                      type='email'
                      label='Correo Electronico'
                      name='email'
                      value={clientData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </Box>

                  <Box
                    display="grid"
                    gridTemplateColumns={{ sm: '1fr', md: '2fr 2fr 1fr' }}
                    gap="15px"
                  >
                    <TextField
                        variant='outlined'
                        label='Calle'
                        name='address_street'
                        value={clientData.address_street}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        required
                    />
                    <TextField
                        variant='outlined'
                        label='N. Exterior'
                        name='address_ext'
                        value={clientData.address_ext}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        required
                    />
                    <TextField
                        variant='outlined'
                        label='N. Interior'
                        name='address_int'
                        value={clientData.address_int}
                        disabled={!isEditing}
                        onChange={handleInputChange}
                    />
                  </Box>

                  <Box
                    display="grid"
                    gridTemplateColumns={{ sm: '1fr', md: '1fr 1fr 1fr 0.5fr' }}
                    gap="15px"
                  >
                    <TextField
                        variant='outlined'
                        label='Colonia'
                        name='address_col'
                        value={clientData.address_col}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        required
                    />
                    <TextField
                        variant='outlined'
                        label='Municipio'
                        name='address_town'
                        value={clientData.address_town}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        required
                    />

                    <TextField
                        variant='outlined'
                        label='Estado'
                        name='address_state'
                        value={clientData.address_state}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        required
                    />
                    <TextField
                        variant='outlined'
                        label='Codigo Postal'
                        name='address_zip'
                        value={clientData.address_zip}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        required
                    />
                  </Box>

                  {
                    isEditing && (
                      <Box
                        display="flex"
                        gap="15px"
                        justifyContent="center"
                      >
                        <Button
                          variant='contained'
                          color='error'
                          onClick={handleCancelEdit}
                        >
                          Cancelar
                        </Button>
                        <Button
                          variant='contained'
                          color='success'
                          type="submit"
                          onClick={handleEditClient}
                        >
                          Guardar
                        </Button>
                      </Box>
                    )
                  }

                  
                  
                </Box>
              </form>
            </Box>
        </Box>
      )}
    </>
  )
}
