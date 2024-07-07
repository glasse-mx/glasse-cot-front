import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { tokens } from "../../theme";
import { coinFormat } from "../../utils";
import { useEffect, useState } from "react";
import { FormProductEditModal } from "../modals";
import { MagicMotion } from "react-magic-motion";

export const ItemsListBLock = ({
  order,
  setOrder,
  error,
  errorEnvio,
  isSale,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { productos, descuentos } = order;

  const handleDeleteProduct = (id) => {
    if (id[0] === "p") {
      setOrder({
        ...order,
        descuentos: descuentos.filter((prod) => prod.id !== id),
      });
    } else {
      setOrder({
        ...order,
        productos: productos.filter((prod) => prod.id !== id),
      });
    }
  };

  const [listings, setListings] = useState([]);

  useEffect(() => {
    const newDescuentos = descuentos.map((descuento, index) => {
      return {
        ...descuento,
        id: !!descuento.id ? descuento.id : `d-${index}`,
      };
    });

    setListings(productos.concat(newDescuentos));
  }, [productos, descuentos]);

  const columns = [
    {
      field: "sku",
      headerName: "SKU",
      flex: 0.25,
    },
    {
      field: "name",
      headerName: "Producto",
      flex: 1,
      valueGetter: (params) => {
        return params.row.name || params.row.descripcion;
      },
    },
    {
      field: "price",
      headerName: "Precio Unit",
      flex: 0.5,
      valueGetter: (params) => {
        if (params.row.valor) {
          return coinFormat(parseFloat(params.row.valor) * -1);
        }

        return coinFormat(parseFloat(params.row.price));
      },
    },
    {
      field: "cant",
      headerName: "Cantidad",
      flex: 0.25,
    },
    {
      field: "subtotal",
      headerName: "Total",
      flex: 0.5,
      valueGetter: (params) => {
        return coinFormat(parseFloat(params.row.subtotal));
      },
    },
    {
      field: "actions",
      headerName: "Acciones",
      flex: 0.5,
      renderCell: (params) =>
        !isSale && (
          <Box display='flex' flex='1' gap='10px'>
            {/* <FormProductEditModal 
                            order={order}
                            setOrder={setOrder}
                            product={params.row}    
                        /> */}

            <Button
              variant='contained'
              color='error'
              onClick={() => handleDeleteProduct(params.row.id)}
            >
              <HighlightOffIcon />
            </Button>
          </Box>
        ),
    },
  ];

  return (
    <Box
      m='20px 0'
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
        "& .MuiDataGrid-overlayWrapper": {
          minHeight: "120px !important",
        },
      }}
    >
      <Box
        p='5px'
        m='10px'
        border={error ? "1px solid red" : "none"}
        borderRadius='10px'
      >
        {/* <MagicMotion> */}
        <DataGrid
          columns={columns}
          rows={listings}
          getRowId={(row) => row.id}
          components={{
            NoRowsOverlay: () => (
              <Stack height='100%' alignItems='center' justifyContent='center'>
                No se han agregado productos a esta cotizacion
              </Stack>
            ),
          }}
        />
        {/* </MagicMotion> */}
      </Box>

      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        gap='10px'
      >
        {error && (
          <Typography variant='body1' component='p' color='red'>
            Se debe incluir al menos un producto
          </Typography>
        )}
      </Box>

      <Box
        p='5px'
        m='10px'
        border={errorEnvio ? "1px solid red" : "none"}
        borderRadius='10px'
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "1.2rem",
            marginTop: "20px",
          }}
        >
          Direccion de Envio:
        </Typography>

        {errorEnvio && (
          <Typography variant='body1' component='p' color='red'>
            Se debe incluir una direccion de envio
          </Typography>
        )}

        {order.detalles_envio?.tipo === "Punto Ocurre" && (
          <Box>
            <Typography
              variant='h5'
              sx={{
                fontWeight: "bold",
                fontSize: "1rem",
                marginTop: "10px",
              }}
            >
              {order.detalles_envio.tipo}
            </Typography>
            {order.detalles_envio?.empresa != "" && (
              <Typography
                variant='h6'
                sx={{
                  fontWeight: "bold",
                  fontSize: "1rem",
                  marginTop: "10px",
                }}
              >
                {order.detalles_envio.empresa}
              </Typography>
            )}
            <Typography>
              Ciudad: {order.detalles_envio.direccion.ciudad}
            </Typography>
            <Typography>
              Estado: {order.detalles_envio.direccion.estado}
            </Typography>
            <Typography>
              Municipio: {order.detalles_envio.direccion.municipio}
            </Typography>
          </Box>
        )}

        {order.detalles_envio?.tipo === "Domicilio" && (
          <Box>
            <Typography
              variant='h5'
              sx={{
                fontWeight: "bold",
                fontSize: "1rem",
                marginTop: "10px",
              }}
            >
              {order.detalles_envio.tipo}
            </Typography>
            <Typography>
              <b>Calle</b>: {order.detalles_envio.direccion.calle}
            </Typography>
            <Typography>
              <b>Exterior</b>: {order.detalles_envio.direccion.exterior}
            </Typography>
            <Typography>
              <b>Interior</b>: {order.detalles_envio.direccion.interior}
            </Typography>
            <Typography>
              <b>Ciudad</b>: {order.detalles_envio.direccion.colonia}
            </Typography>
            <Typography>
              <b>Ciudad</b>: {order.detalles_envio.direccion.ciudad}
            </Typography>
            <Typography>
              <b>Estado</b>: {order.detalles_envio.direccion.estado}
            </Typography>
            <Typography>
              <b>CP</b>: {order.detalles_envio.direccion.cp}
            </Typography>
          </Box>
        )}

        {order.detalles_envio?.tipo === "Sala de Exhibicion" && (
          <Box>
            <Typography>
              Se entrega en Sala de Exhibición de{" "}
              {import.meta.env.VITE_COMPANY_NAME}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};
