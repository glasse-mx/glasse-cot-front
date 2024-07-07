import { FormControl, InputLabel, Select, MenuItem, TextField, Button, Box } from "@mui/material"
import { usePaymentOptions } from "../../utils"

export const PaymentItem = ({ index, value, onChange, onDelete }) => {

    const { paymentTypes, banks } = usePaymentOptions()
    
  return (
    <Box>
        <FormControl>
            <Box
                display = "grid"
                gap = "15px"
                gridTemplateColumns = {{ xs: '1fr', md: '1fr 1fr' }}
            >
                <InputLabel id="paymentType"> Metodo de Pago</InputLabel>
                <Select
                    labelId="paymentType"
                    id="paymentType"
                    name='paymentType'
                    value={value.paymentType}
                    label="Seleccione Metodo de Pago"
                    onChange={(e) => onChange(e, index)}
                >
                    {paymentTypes && paymentTypes.map((paymentOption) => (
                        <MenuItem key={paymentOption.id} value={paymentOption.id}>{paymentOption.value}</MenuItem>
                    ))}
                </Select>

                <TextField
                    variant='outlined'
                    label='Monto'
                    type='number'
                    name='amount'
                    value={value.amout}
                    onChange={(e) => onChange(e, index)}
                    required
                />

                {
                    (value.paymentType >= 2 && value.paymentType <= 5) && (
                        <FormControl sx={{ minWidth: 180 }}>
                            <InputLabel id="bank">Banco</InputLabel>
                            <Select
                                labelId="bank"
                                id="bank"
                                value={value.bank}
                                label="Seleccione Banco"
                                name='bank'
                                onChange={(e) => onChange(e, index)}

                            >
                                {banks && banks.map((bank) => (
                                    <MenuItem key={bank.id} value={bank.id}>{bank.bank}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )
                }

                {
                    value.paymentType != 1 && (
                        <TextField
                            variant='outlined'
                            label='Referencia'
                            name='reference'
                            value={value.reference}
                            onChange={(e) => onChange(e, index)}
                            required
                        />
                    )
                }
            </Box>

            <Button 
                onClick={e => onDelete(index)}
                variant='contained'
                color='error'
                sx={{
                    m: '10px 0'
                }}
            >
                Eliminar
            </Button>

        </FormControl>
    </Box>
  )
}
