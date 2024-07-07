import { Box, Typography } from "@mui/material"
import { coinFormat, getPaymentType, getBank } from "../../utils"

export const OrderBilling = ({ order }) => {

    const { detalle_anticipo, detalles_pago, subtotal_productos, subtotal_promos, total } = order

  return (
    <Box
        display="grid"
        gridTemplateColumns="repeat(2, 1fr)"
        gap="10px"
        m="10px 0"
    >
        <Box>
            {
                !!detalle_anticipo.length && (
                <>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: "bold"
                        }}
                    >
                        Anticipos
                    </Typography>
                    <Box>
                        {
                            !!order.detalle_anticipo && order.detalle_anticipo.map((anticipo, index) => (
                                <Box key={index}>
                                    <Typography sx={{fontSize: '11px'}}>
                                        {!!anticipo.date && `${anticipo.date} - `}{!!anticipo.amount && `${coinFormat(parseFloat(anticipo.amount))} - `}{!!anticipo.paymentType && `${getPaymentType(anticipo.paymentType)} - `}{!!anticipo.bank && `${getBank(anticipo.bank)} - `}{!!anticipo.reference && `${anticipo.reference}`}
                                    </Typography>
                                </Box>
                            ))
                        }
                    </Box>
                </>
                )
            }

            {
                !!detalles_pago.length && (
                <>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: "bold"
                        }}
                    >
                        Pagos
                    </Typography>
                    <Box>
                        { detalles_pago.map((pago, i) => (
                            <Typography key={i} sx={{fontSize: '11px'}}>
                                {!!pago.date && `${pago.date} - `}{!!pago.amount && `${coinFormat(parseFloat(pago.amount))} - `}{!!pago.paymentType && `${getPaymentType(pago.paymentType)} - `}{!!pago.bank && `${getBank(pago.bank)} - `}{!!pago.reference && `${pago.reference}`}
                            </Typography>
                        )) }
                    </Box>
                </>
                )
            }
            
        </Box>
        <Box>
            <Box
                display="grid"
                gridTemplateColumns="repeat(2, 1fr)"
                gap="10px"
                bgcolor="#F9F9FA"
                border="#DFE4EA solid 1px"
                p="12px"
                borderRadius="6px"
            >
                <Typography
                    sx={{
                        fontWeight: '600'
                    }}
                >
                    Sub Total: 
                </Typography>

                <Typography
                    sx={{
                        textAlign: "right"
                    }}
                >
                    {coinFormat(parseFloat(subtotal_productos))}
                </Typography>

                <Typography
                    sx={{
                        fontWeight: '600'
                    }}
                >
                    Descuentos: 
                </Typography>

                <Typography
                    sx={{
                        textAlign: "right"
                    }}
                >
                    {!!subtotal_promos ? coinFormat(parseFloat(subtotal_promos)) : "0"}
                </Typography>

                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: '600'
                    }}
                >
                    Total: 
                </Typography>

                <Typography
                    variant="h5"
                    sx={{
                        textAlign: "right",
                        fontWeight: '600'
                    }}
                >
                    {coinFormat(parseFloat(total))}
                </Typography>
            </Box>
        </Box>
    </Box>
  )
}
