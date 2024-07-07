import { Box, Typography } from "@mui/material";

export const OrderComments = ({ order }) => {
  const { detalles_envio, observaciones } = order;

  return (
    <Box
      display='grid'
      gridTemplateColumns={{ md: "1fr 1fr", sm: "1fr" }}
      gap='20px'
      mt='20px'
      borderTop='solid 1px #BEBEBE'
      pt='10px'
    >
      <Box>
        <Typography
          variant='h5'
          sx={{
            fontWeight: "bold",
          }}
        >
          Detalles de envío:
        </Typography>
        {detalles_envio?.tipo === "Sala de Exhibicion" ? (
          <Typography>
            Se entrega en Sala de exhibición de{" "}
            {import.meta.env.VITE_COMPANY_NAME}
          </Typography>
        ) : detalles_envio?.tipo === "Punto Ocurre" ? (
          <>
            <Typography
              sx={{
                fontWeight: "bold",
                textTransform: "uppercase",
                mt: "10px",
              }}
            >
              {detalles_envio?.tipo}
            </Typography>
            <Typography>{detalles_envio?.empresa}</Typography>
            <Typography>
              <b>Ciudad:</b> {detalles_envio?.direccion?.ciudad}
            </Typography>
            <Typography>
              <b>Estado:</b> {detalles_envio?.direccion?.estado}
            </Typography>
            <Typography>
              <b>Municipio:</b> {detalles_envio?.direccion?.municipio}
            </Typography>
          </>
        ) : (
          <>
            <Typography>{detalles_envio?.tipo}</Typography>
            <Typography>
              <b>Calle: </b>
              {detalles_envio?.direccion?.calle}
            </Typography>
            <Typography>
              <b>Exterior: </b>
              {detalles_envio?.direccion?.exterior}
            </Typography>
            <Typography>
              <b>Interior: </b>
              {detalles_envio?.direccion?.interior || " - "}
            </Typography>
            <Typography>
              <b>Colonia: </b>
              {detalles_envio?.direccion?.colonia}
            </Typography>
            <Typography>
              <b>Ciudad: </b>
              {detalles_envio?.direccion?.ciudad}
            </Typography>
            <Typography>
              <b>Estado: </b>
              {detalles_envio?.direccion?.estado}
            </Typography>
            <Typography>
              <b>Municipio: </b>
              {detalles_envio?.direccion?.municipio || " - "}
            </Typography>
            <Typography>
              <b>CP: </b>
              {detalles_envio?.direccion?.cp}
            </Typography>
          </>
        )}
      </Box>
      <Box border='solid 1px #BEBEBE' height='105px' p='5px' borderRadius='5px'>
        <Typography
          variant='h6'
          sx={{
            fontWeight: "bold",
          }}
        >
          Observaciones:
        </Typography>
        {/* <Typography>{!!observaciones && observaciones}</Typography> */}
        <Typography
          variant='body1'
          dangerouslySetInnerHTML={{
            __html: (!!observaciones && observaciones) || "",
          }}
        />
      </Box>
    </Box>
  );
};
