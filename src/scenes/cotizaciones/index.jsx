import { useState, useEffect } from "react";
import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { Link } from "react-router-dom";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import Header from "./../../components/Header";
import axios from "axios";
import { coinFormat, formatFolio } from "../../utils";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

export const CotizacionesAll = () => {
  const authHeader = useAuthHeader();
  const user = useAuthUser();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    let params = {
      user_id: user.id,
    };

    let config = {
      method: "get",
      url: `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/orders/quotes`,
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      params: params,
    };

    axios
      .request(config)
      .then((response) => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "Folio",
      flex: 0.5,
      valueGetter: (params) => {
        return formatFolio(params.row.folio_cotizacion_id);
      },
    },
    {
      field: "created_by",
      headerName: "Vendedor",
      valueGetter: (params) => {
        return params.row.created_by.name;
      },
      flex: 1,
    },
    {
      field: "id_cliente",
      headerName: "Cliente",
      valueGetter: (params) => {
        return (
          params.row.id_cliente.first_name +
          " " +
          params.row.id_cliente.last_name
        );
      },
      flex: 1,
    },
    {
      field: "fecha",
      headerName: "Fecha",
      flex: 0.5,
    },
    {
      field: "total",
      headerName: "Total en MXN $",
      flex: 0.5,
      valueGetter: (params) => {
        return coinFormat(params.row.total);
      },
    },
    // {
    //   field: 'folio_status_id',
    //   headerName: 'Estatus',
    //   flex: .5,
    // },
    {
      field: "action",
      headerName: "",
      flex: 0.35,
      renderCell: (params) => {
        return (
          <Link to={`/cotizacion/${params.id}`}>
            <Button variant='contained' color='info' size='small'>
              Ver
            </Button>
          </Link>
        );
      },
    },
  ];

  return (
    <Box m='20px'>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Header title='Cotizaciones' subtitle='Todas las cotizaciones' />
      </Box>

      <Box
        height='75vh'
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
          },
        }}
      >
        <DataGrid
          columns={columns}
          rows={orders}
          initialState={{
            sorting: {
              sortModel: [{ field: "id", sort: "desc" }],
            },
          }}
          loading={loading}
          components={{
            NoRowsOverlay: () => (
              <Stack height='100%' alignItems='center' justifyContent='center'>
                No se han encontrado folios
              </Stack>
            ),
          }}
        />
      </Box>
    </Box>
  );
};
