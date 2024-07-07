import { Box, Typography } from "@mui/material";

export const OrderClient = ({ order }) => {
  return (
    <Box
      display='grid'
      gridTemplateColumns='repeat(2, 1fr)'
      gap='10px'
      m='10px 0'
    >
      <Box>
        <Typography
          variant='h6'
          sx={{
            fontWeight: "bold",
          }}
        >
          Detalles de Cliente
        </Typography>

        <Typography>
          {order.id_cliente.first_name} {order.id_cliente.last_name}
        </Typography>
        <Typography>{order.id_cliente?.email}</Typography>
        <Typography>{order.id_cliente?.phone}</Typography>
      </Box>

      <Box>
        <Typography
          variant='h6'
          sx={{
            fontWeight: "bold",
          }}
        >
          Dirección de Facturación
        </Typography>
        <Typography>
          {order.id_cliente?.address_street} {order.id_cliente?.address_ext}{" "}
          {order.id_cliente?.address_int &&
            `, ${order.id_cliente?.address_int}`}
        </Typography>
        <Typography>
          {order?.id_cliente?.address_col && order?.id_cliente?.address_col}{" "}
          {order?.id_cliente?.address_town &&
            `, ${order?.id_cliente?.address_town}`}{" "}
          {order?.id_cliente?.address_state &&
            `, ${order?.id_cliente?.address_state}`}
        </Typography>
        <Typography>
          {order.id_cliente?.address_zip &&
            `CP: ${order.id_cliente?.address_zip}`}
        </Typography>
      </Box>
    </Box>
  );
};
