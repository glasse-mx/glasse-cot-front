import { Box, Button, Typography } from "@mui/material";
import { coinFormat } from "../../utils";
import { FormAddAnticipoModal, FormAddPagoModal } from "../modals";
import { getPaymentType, getBank } from "../../utils";
import DeleteIcon from "@mui/icons-material/Delete";

export const BillingBlock = ({ order, setOrder, error, isSale }) => {
  const { totalError } = error;

  const handleDeleteAnticipo = (index) => {
    const newAnticipos = order.detalles_anticipo.filter(
      (anticipo, i) => i !== index
    );
    setOrder({
      ...order,
      detalles_anticipo: newAnticipos,
    });
  };

  const handleDeletePago = (index) => {
    const newPagos = order.detalles_pago.filter((pago, i) => i !== index);
    setOrder({
      ...order,
      detalles_pago: newPagos,
    });
  };

  return (
    <Box display='grid' gap='15px' gridTemplateColumns='3fr 1fr'>
      <Box
        display='grid'
        gap='15px'
        gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
        p='5px'
        border={totalError && "solid 1px red"}
        borderRadius='8px'
      >
        <Box>
          <Typography variant='h6' element='p'>
            Anticipos
          </Typography>

          {!!order.detalles_anticipo &&
            order.detalles_anticipo.map((anticipo, index) => (
              <Box key={index} display='flex' gap='5px' m='5px 0'>
                <Typography>
                  {!!anticipo.date && `${anticipo.date} - `}
                  {!!anticipo.amount &&
                    `${coinFormat(parseFloat(anticipo.amount))} - `}
                  {!!anticipo.paymentType &&
                    `${getPaymentType(anticipo.paymentType)} - `}
                  {!!anticipo.bank && `${getBank(anticipo.bank)} - `}
                  {!!anticipo.reference && `${anticipo.reference}`}
                </Typography>
                {!isSale && (
                  <Button
                    onClick={() => handleDeleteAnticipo(index)}
                    variant='contained'
                    color='error'
                  >
                    <DeleteIcon />
                  </Button>
                )}
              </Box>
            ))}

          {!isSale && (
            <FormAddAnticipoModal
              order={order}
              setOrder={setOrder}
              isSale={isSale}
            />
          )}
        </Box>

        <Box>
          <Typography variant='h6' element='p'>
            Pagos
          </Typography>

          {!!order.detalles_pago &&
            order.detalles_pago.map((pago, index) => (
              <Box key={index} display='flex' gap='5px' m='5px 0'>
                <Typography>
                  {!!pago.date && `${pago.date} - `}
                  {!!pago.amount && `${coinFormat(parseFloat(pago.amount))} - `}
                  {!!pago.paymentType &&
                    `${getPaymentType(pago.paymentType)} - `}
                  {!!pago.bank && `${getBank(pago.bank)} - `}
                  {!!pago.reference && `${pago.reference}`}
                </Typography>
                <Button
                  onClick={() => handleDeletePago(index)}
                  variant='contained'
                  color='error'
                >
                  <DeleteIcon />
                </Button>
              </Box>
            ))}
          <FormAddPagoModal order={order} setOrder={setOrder} />
        </Box>

        {totalError && (
          <Typography variant='h6' element='p' color='error'>
            El monto de los anticipos y pagos no coincide con el total
          </Typography>
        )}
      </Box>

      <Box
        display='grid'
        gap='15px'
        gridTemplateColumns='1fr 1fr'
        padding='1rem'
        mr='1rem'
        border='solid 1px #ccc'
        borderRadius='8px'
      >
        <Typography variant='h6' element='p'>
          Subtotal Productos:
        </Typography>
        <Typography element='p' textAlign='right'>
          {order.subtotal_productos
            ? coinFormat(order.subtotal_productos)
            : "0"}
        </Typography>

        <Typography variant='h6' element='p'>
          Subtotal Descuentos:
        </Typography>
        <Typography textAlign='right' element='p'>
          {order.subtotal_promos ? coinFormat(order.subtotal_promos) : "0"}
        </Typography>

        <Typography variant='h4' element='p'>
          TOTAL:
        </Typography>
        <Typography variant='h4' textAlign='right' element='p'>
          {order.total ? coinFormat(order.total) : "0"}
        </Typography>
      </Box>
    </Box>
  );
};
