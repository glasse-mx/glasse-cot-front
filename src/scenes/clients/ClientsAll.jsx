import { Box, Typography, useTheme, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'
import { tokens } from '../../theme'
import Header from './../../components/Header'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import { useEffect, useState } from 'react'
import axios from 'axios'


export const ClientsAll = () => {

  const authHeader = useAuthHeader();

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const columns = [
    {
      field: 'first_name',
      headerName: 'Nombres',
      flex: 1
    },
    {
      field: 'last_name',
      headerName: 'Apellidos',
      flex: 1
    },
    {
      field: 'email',
      headerName: 'Correo',
      flex: 1
    },
    {
      field: 'phone',
      headerName: 'Teléfono',
      flex: 1,
      sortable: false
    },
    {
      field: 'address_state',
      headerName: 'Estado',
      flex: 1
    },
    {
      field: 'address_zip',
      headerName: 'CP',
      flex: 1
    },
    {
      field: 'id',
      headerName: '',
      flex: 1,
      renderCell: ({row: {id}}) => (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          p='.5rem 3rem'
          
        >
          <Link to={`/clientes/${id}`}>
            <Button
              variant="contained"
              color="info"
              // size="small" 
            >
              Ver
            </Button>
          </Link>
        </Box>
      )
    }
  ]

  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [seachValue, setSearchValue] = useState('')

  useEffect(() => {

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/clients`,
      headers: {
        'Authorization': authHeader
      }
    }

    axios.request(config)
      .then((res) => {
        setClients(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
      })

  }, [])


  return (
    <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header 
            title="Clientes"
            subtitle="Todos los clientes"
            />
        </Box>

        <Box
          m="10px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            }
          }}
        >
          <DataGrid 
            columns={columns}
            rows={clients}
            loading={loading}
          />
        </Box>
    </Box>
  )
}
