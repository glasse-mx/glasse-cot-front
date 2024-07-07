import { Modal, Box, Typography, Button, TextField, MenuItem, FormControl, InputLabel, Select } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useState } from 'react'
import { usePaymentOptions } from '../../utils'
import AddCardIcon from '@mui/icons-material/AddCard';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "50%",
  maxWidth: "800px",
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '10px',
  p: 4,
}

export const FormAddPagoModal = ({ order, setOrder, }) => {

    const { paymentTypes, banks } = usePaymentOptions()
    const [open, setOpen] = useState(false)

    const initialValue = {
        date: '',
        amount: '',
        paymentType: '',
        bank: '',
        reference: '',
    }

    const [ pago, setPago ] = useState(initialValue)

    const handleAddPago = () => {
        setOrder({
            ...order,
            detalles_pago: [...order.detalles_pago, pago]
        })
        setOpen(false)
    }

    const handleSetDate = (date) => {
        setPago({
            ...pago,
            date: dayjs(date).format('DD/MM/YYYY')
        })
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setPago({
            ...pago,
            [name]: value
        })
    }

  return (
    <>
        <Button
            variant='contained'
            color='info'
            onClick={() => setOpen(true)}
            sx={{
                m: '10px 0'
            }}
        >
            Agregar 
            <AddCardIcon />
        </Button>

        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Box
                    display="flex"
                    justifyContent="center"
                    sx={{
                        "& svg": {
                            fontSize: "5rem",
                            color: "inifo"
                        }
                    }}
                >
                    <AddCardIcon />
                </Box>

                <Typography 
                    id="modal-modal-title" 
                    variant="h4" 
                    component="h4"
                    sx={{
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        textAlign: 'center'
                    }}
                >
                    Agregar Pago          
                </Typography>

                <Box>
                    <Box
                        display="flex"
                        justifyContent="center"
                        gap="1rem"
                        m="10px 0"
                    >
                        <DatePicker 
                            fullWidth
                            format='DD/MM/YYYY'
                            onChange={handleSetDate}
                        />

                        <TextField
                            variant='outlined'
                            label='Monto'
                            type='number'
                            name='amount'
                            value={pago.amount}
                            onChange={handleInputChange}
                            fullWidth
                            required
                        />

                    </Box>

                    <Box
                        display="flex"
                        gap="10px"
                        m="10px 0"
                    >
                        <FormControl fullWidth>
                            <InputLabel color='info' id="paymentType"> Metodo de Pago</InputLabel>
                            <Select
                                labelId="paymentType"
                                id="paymentType"
                                name='paymentType'
                                value={pago.paymentType}
                                label="Seleccione Metodo de Pago"
                                color='info'
                                onChange={handleInputChange}
                            >
                                {paymentTypes && paymentTypes.map((paymentOption) => (
                                    <MenuItem key={paymentOption.id} value={paymentOption.id}>{paymentOption.value}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                    </Box>

                    {
                      pago.paymentType != 1 && (
                        <Box
                            display="flex"
                            gap="10px"
                            m="10px 0"
                        >
                            {
                              pago.paymentType >= 2 && pago.paymentType <= 5 && (
                                <FormControl fullWidth>
                                    <InputLabel id="bank">Banco</InputLabel>
                                    <Select
                                        labelId="bank"
                                        id="bank"
                                        value={pago.bank}
                                        label="Seleccione Banco"
                                        name='bank'
                                        onChange={handleInputChange}
                                    >
                                        {banks && banks.map((bank) => (
                                            <MenuItem key={bank.id} value={bank.id}>{bank.bank}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                              )
                            }

                            <TextField 
                                variant='outlined'
                                label='Referencia'
                                name='reference'
                                value={pago.reference}
                                onChange={handleInputChange}
                                fullWidth
                                required
                            />
                        </Box>
                      )
                    }

                </Box>

                <Box
                    display="flex"
                    justifyContent="center"
                    m="20px 0 10px"
                >
                    <Button
                        variant='contained'
                        color='success'
                        endIcon={<NavigateNextIcon />}
                        onClick={handleAddPago}
                    >
                        Agregar Pago
                    </Button>
                </Box>
            </Box>
        </Modal>
    </>
  )
}
