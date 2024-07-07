import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { Link } from "react-router-dom";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import axios from "axios";
import { coinFormat, formatFolio, getOrderApprovalStatus } from "../../utils";
import Header from "./../../components/Header";
import { useState, useEffect } from "react";

export const VentasAll = () => {
  const authHeader = useAuthHeader();
  const user = useAuthUser();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(orders);

  useEffect(() => {
    let params = {
      user_id: user.id,
    };

    let config = {
      method: "get",
      url: `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/orders/sales`,
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
        return formatFolio(params.row.folio_nota_venta_id);
      },
    },
    {
      field: "created_by",
      headerName: "Vendedor",
      flex: 1,
      valueGetter: (params) => {
        return params.row.created_by.name;
      },
    },
    {
      field: "id_client",
      headerName: "Cliente",
      flex: 1,
      valueGetter: (params) => {
        return (
          params.row.id_cliente.first_name +
          " " +
          params.row.id_cliente.last_name
        );
      },
    },
    {
      field: "fecha",
      headerName: "Fecha",
      flex: 0.5,
    },
    {
      field: "total",
      headerName: "Total en MXN $",
      flex: 0.4,
      valueGetter: (params) => {
        return coinFormat(params.row.total);
      },
    },
    {
      field: "status",
      headerName: "Estatus",
      flex: 0.35,
      renderCell: (params) => {
        const { status, color } = getOrderApprovalStatus(params.row, user);
        return (
          <Stack>
            <Typography color={color}>{status}</Typography>
          </Stack>
        );
      },
    },
    {
      field: "update",
      headerName: "Ult. Actualización",
      flex: 1,
      renderCell: (params) => {
        return (
          <Stack>
            <Typography>
              {params.row.edited_by.name} <br /> {params.row.editado_en}
            </Typography>
          </Stack>
        );
      },
    },
    {
      field: "action",
      headerName: "",
      flex: 0.35,
      renderCell: (params) => {
        return (
          <Stack direction='row' spacing={2}>
            <Link to={`/notas-venta/${params.row.id}`}>
              <Button variant='contained' color='info' size='small'>
                Ver
              </Button>
            </Link>
          </Stack>
        );
      },
    },
  ];

  return (
    <Box m='20px'>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Header title='Ventas' subtitle='Todas las ventas' />
      </Box>

      <Box
        height='75vh'
        width='100%'
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
          loading={loading}
          initialState={{
            sorting: {
              sortModel: [{ field: "id", sort: "desc" }],
            },
          }}
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
