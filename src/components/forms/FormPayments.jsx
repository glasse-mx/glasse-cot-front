import { PaymentItem } from "../orderBlocks"
import { Box, Button } from "@mui/material"

export const FormPayments = ({ order, setOrder }) => {

    const initialVal = {
        paymentType: 0,
        amount: 0,
        bank: 0,
        reference: ''
    }

    const { detalles_pago } = order


    const handleAddPago = () => {
        setOrder({ ...order, detalles_pago: [...detalles_pago, initialVal] })
        // console.log(detalles_pago)
    }

    const handleEditPago = (e, index) => {
        const { name, value } = e.target
        const list = [...detalles_pago]
        list[index][name] = value
        setOrder({ ...order, detalles_pago: list })
    }

    const handleDeletePago = (index) => {
        const list = [...detalles_pago]
        list.splice(index, 1)
        setOrder({ ...order, detalles_pago: list })
    }

  return (
    <Box>
        <Button 
            onClick={handleAddPago}
            variant='contained'
            color='info'
            sx={{
                m: '10px 0'
            }}
        >
            <i className="fas fa-plus"></i> Agregar
        </Button>

        {
            detalles_pago && (
                detalles_pago.map((item, index) =>
                    <PaymentItem
                        key={index}
                        index={index}
                        value={item}
                        onChange={handleEditPago}
                        onDelete={handleDeletePago}
                    />
                )
            )

        }
    </Box>
  )
}
