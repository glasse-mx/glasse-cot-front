import { Box, Button, Stack, useTheme } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { tokens } from "../../theme"
import { Link } from "react-router-dom"
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader"
import useAuthUser from "react-auth-kit/hooks/useAuthUser"
import axios from "axios"
import { coinFormat, formatFolio } from "../../utils"
import Header from "./../../components/Header"
import { useState, useEffect } from "react"

export const CanceladasAll = () => {

  const authHeader = useAuthHeader();
  const user = useAuthUser()
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const [ orders, setOrders ] = useState([])
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {


    let config = {
      method: 'get',
      url: `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/orders/cancelations`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      }
    }

    axios.request(config)
      .then((response) => {
        setOrders(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
      });

  }, [])

  const columns = [
    {
      field: 'id',
      headerName: 'Folio',
      flex: .25,
      valueGetter: (params) => {
        return formatFolio(params.row.id)
      }
    },
    {
      field: 'created_by',
      headerName: 'Vendedor',
      valueGetter: (params) => {
        return params.row.created_by.name
      },
      flex: 1
    },
    {
      field: 'id_client',
      headerName: 'Cliente',
      flex: 1,
      valueGetter: (params) => {
        return params.row.id_cliente.first_name + ' ' + params.row.id_cliente.last_name
      },
    },
    {
      field: 'fecha',
      headerName: 'Fecha',
      flex: .5,
    },
    {
      field: 'total',
      headerName: 'Total en MXN $',
      flex: .5,
      valueGetter: (params) => {
        return coinFormat(params.row.total)
      }
    },
    {
      field: 'action',
      headerName: '',
      flex: .35,
      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={2}>
            <Link to={`/notas-canceladas/${params.row.id}`}>
              <Button 
                variant="contained" 
                color="info" 
                size="small"
              >
                Ver
              </Button>
            </Link>
          </Stack>
        )
      }
    }
  ]
    

  return (
    <Box m="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Header
          title="Notas Canceladas"
          subtitle="Todas las notas de venta canceladas"
        />
      </Box>

      <Box
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
            rows={orders}
            columns={columns}
            pageSize={10}
            loading={loading}
            initialState={{
              sorting: {
                sortModel: [{ field: 'id', sort: 'desc' }],
              },
          }}
          />
        </Box>
    </Box>
  )
}
