import { useState, useEffect } from "react"
import { Box, Typography, TextField, Button } from "@mui/material"

export const FormPromo = ({order, setOrder, setIsAddingPromo}) => {

    const initialPromoValue = {
        id: 0,
        descripcion: '',
        cant: 1,
        valor: 0,
        total: 0,
        subtotal: 1,
    }

    const [ promoValue, setPromoValue ] = useState({
        ...initialPromoValue,
        id: 'p' + order.descuentos.length
    })

    const [ errorPromo, setErrorPromo ] = useState(false)

    useEffect(() => {
        setPromoValue({
            ...promoValue,
            subtotal: promoValue.cant * promoValue.valor
        })
    }, [promoValue.cant, promoValue.valor])

    const onPromoChange = (e) => {
        const { name, value } = e.target
        setPromoValue({
            ...promoValue,
            [name]: value
        })
    }

    const handleAddPromo = (e) => {

        if (promoValue.descripcion === '' ) {
            setErrorPromo(true)
            return
        }

        setOrder({
            ...order,
            descuentos: [...order.descuentos, promoValue]
        })
        setIsAddingPromo(false)
    }


  return (
    <Box>
        <Box
            display="flex"
            flexDirection="column"
            gap="15px"
        >
            <Box
                display="flex"
            >
                <TextField
                    name="descripcion"
                    label="Descripcion"
                    variant="outlined"
                    value={promoValue.descripcion}
                    onChange={onPromoChange}
                    fullWidth
                    error={errorPromo}
                    helperText={errorPromo && 'Este campo es requerido'}
                />
            </Box>

            <Box
                display="flex"
                gap="15px"
            >
                <TextField
                    name="cant"
                    label="Cantidad"
                    type="number"
                    variant="outlined"
                    value={promoValue.cant}
                    onChange={onPromoChange}
                    fullWidth
                />
                <TextField
                    name="valor"
                    label="Valor"
                    type="number"
                    variant="outlined"
                    value={promoValue.valor}
                    onChange={onPromoChange}
                    fullWidth
                />
            </Box>

            <Box>
                <Typography
                    variant="h4"
                >
                    Subtotal: {promoValue.subtotal}
                </Typography>
            </Box>
            
            <Button
                variant="contained"
                color="success"
                onClick={handleAddPromo}
            >
                Agregar Promocion
            </Button>
        </Box>
    </Box>
  )
}
