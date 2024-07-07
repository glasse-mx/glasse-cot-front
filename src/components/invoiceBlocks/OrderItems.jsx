import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import { coinFormat } from '../../utils'




export const OrderItems = ({ order }) => {

    const { productos, descuentos } = order
    const listings = productos.concat(descuentos)

    // console.log(order)

  return (
    <Box
        m="1rem -5px"
        p="0"
        minHeight="250px"
        borderBottom="solid 1px #BEBEBE"
        pb="10px"
        sx={{
            "& .css-8er80j-MuiPaper-root-MuiTableContainer-root" : {
                boxShadow: "none !important",
            },
            "& thead" : {
                bgcolor: "#BEBEBE !important",
            },
            "& thead tr th" : {
                padding: "8px 16px !important",
                borderBottom: "none !important",
                color: "#687076 !important",
            },
            "& tbody tr" : {
                backgroundColor: "#fff",
            },
            "& tbody tr:last-child" : {
                border: "none !important",

            },
            "& tbody tr th, & tbody tr td" : {
                color: "#11181C !important",
                borderColor: "#BEBEBE !important",
                padding: "10px 16px !important",
                textTransform: "uppercase !important",
            }
        }}
    >
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Producto</TableCell>
                        <TableCell align="right">Cant.</TableCell>
                        <TableCell align="right">Precio</TableCell>
                        <TableCell align="right">Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listings?.map((listing) => (
                        <TableRow key={listing.id}>
                            <TableCell component="th" scope="row">
                                {listing.name || listing.descripcion}
                            </TableCell>
                            <TableCell align="right">{listing.cant}</TableCell>
                            <TableCell align="right">
                                { 
                                    !!listing.price && typeof listing.price === 'string'
                                    ? (  coinFormat(parseFloat(listing.price)) ) 
                                    : coinFormat(parseFloat(listing.valor) * -1)
                                }
                            </TableCell>
                            <TableCell align="right">{coinFormat(listing.subtotal)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Box>
  )
}
