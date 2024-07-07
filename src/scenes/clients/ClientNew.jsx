import Header from './../../components/Header'
import { Box, Button, TextField } from '@mui/material'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

export const ClientNew = () => {

  const authHeader = useAuthHeader();
  const navigate = useNavigate()

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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setClientData({ ...clientData, [name]: value })
  }

  const handleAddClient = (e) => {
    e.preventDefault()
    console.log(clientData)

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/clients`,
      headers: {
        'Authorization': authHeader
      },
      data: clientData
    }

    axios.request(config)
      .then((res) => {
        navigate(`/clientes/${res.data.id}`)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header 
            title="Nuevo Cliente"
            subtitle="Agregar un nuevo cliente"
            />
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
                  required
                />
                <TextField 
                  name="last_name"
                  label="Apellidos"
                  variant="outlined"
                  margin="normal"
                  value={clientData.last_name}
                  onChange={handleInputChange}
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
                  required
                />
                <TextField
                  variant='outlined'
                  type='email'
                  label='Correo Electronico'
                  name='email'
                  value={clientData.email}
                  onChange={handleInputChange}
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
                    required
                />
                <TextField
                    variant='outlined'
                    label='N. Exterior'
                    name='address_ext'
                    value={clientData.address_ext}
                    onChange={handleInputChange}
                    required
                />
                <TextField
                    variant='outlined'
                    label='N. Interior'
                    name='address_int'
                    value={clientData.address_int}
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
                    required
                />
                <TextField
                    variant='outlined'
                    label='Municipio'
                    name='address_town'
                    value={clientData.address_town}
                    onChange={handleInputChange}
                    required
                />

                <TextField
                    variant='outlined'
                    label='Estado'
                    name='address_state'
                    value={clientData.address_state}
                    onChange={handleInputChange}
                    required
                />
                <TextField
                    variant='outlined'
                    label='Codigo Postal'
                    name='address_zip'
                    value={clientData.address_zip}
                    onChange={handleInputChange}
                    required
                />
              </Box>

              <Button 
                type="submit" 
                onClick={handleAddClient} 
                className="btn-primary" 
                variant="contained"
                sx={{
                  marginTop: '20px'
                }}
              >
                  Guardar
              </Button>
              
            </Box>
          </form>
        </Box>
    </Box>
  )
}
