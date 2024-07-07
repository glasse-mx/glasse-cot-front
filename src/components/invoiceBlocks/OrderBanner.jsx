import { Box, Typography } from "@mui/material";
import { formatFolio } from "../../utils";

export const OrderBanner = ({ order }) => {
  return (
    <Box
      display='grid'
      gridTemplateColumns='repeat(2, 1fr)'
      gap='20px'
      pb='10px'
      pt='10px'
      borderBottom={`1px solid #BEBEBE`}
    >
      <Box
        display='flex'
        flexDirection='column'
        sx={{
          "& p": {
            color: "#7E868C",
          },
        }}
      >
        <img
          src={`../../assets/banner-shield.png`}
          alt='Banner-Shield'
          height='120px'
          width='290px'
          objectFit='cover !important'
        />
      </Box>

      <Box>
        <Typography
          variant='h2'
          sx={{
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          {!!order.folio_nota_venta_id ? "Nota de Venta" : "Cotización"}
        </Typography>
        {order.folio_nota_venta_id && (
          <Typography>
            {`F. Venta: ${formatFolio(order.folio_nota_venta_id)}`}
          </Typography>
        )}
        {order.folio_cotizacion_id && (
          <Typography>
            {`F. Cotizacion: ${formatFolio(order.folio_cotizacion_id)}`}
          </Typography>
        )}
        <Box display='grid' gridTemplateColumns='85px auto' gap='2px' mt='10px'>
          <Typography
            sx={{
              color: "#7E868C",
              fontWeight: "500",
            }}
          >
            Fecha:
          </Typography>
          <Typography>{order.fecha}</Typography>
          <Typography
            sx={{
              color: "#7E868C",
              fontWeight: "500",
            }}
          >
            Vendedor/a:
          </Typography>
          <Typography>{order.created_by.name}</Typography>
          <Typography mt='20px'>{order.created_by.email}</Typography>
          <Typography>{order.created_by.phone}</Typography>
        </Box>
      </Box>
    </Box>
  );
};
