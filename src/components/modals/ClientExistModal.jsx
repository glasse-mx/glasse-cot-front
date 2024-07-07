import { Modal, Box, Typography, TextField, Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  maxWidth: "1000px",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

export const ClientExistModal = ({
  open,
  setOpen,
  setClientData,
  order,
  setOrder,
  setClientInfo,
  clientExistData,
}) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          sx={{
            "& img": {
              height: "180px",
            },
          }}
        >
          <img
            src={`../../assets/client-exist.png`}
            alt='Seem to be something off!'
          />
        </Box>

        <Box
          display='flex'
          flexDirection='column'
          gap='8px'
          alignItems='center'
        >
          <Typography variant='h3' textAlign='center' fontWeight='bold'>
            Parece que este numero de telefono ya existe
          </Typography>
          <Typography variant='h4'>
            Este numero le pertenece a {clientExistData.first_name}{" "}
            {clientExistData.last_name}{" "}
            {clientExistData.address_state &&
              `de ${clientExistData.address_state}`}
          </Typography>
          <Typography variant='h4' textAlign='center'>
            ¿Deseas agregarlo a la orden?
          </Typography>
        </Box>
        <Box
          display='flex'
          justifyContent='center'
          gap='15px'
          mt='30px'
          sx={{
            "& button": {
              width: "150px",
            },
          }}
        >
          <Button
            variant='contained'
            color='error'
            onClick={() => setOpen(false)}
          >
            Volver
          </Button>
          <Button
            variant='contained'
            color='success'
            onClick={() => {
              setOrder({ ...order, id_cliente: clientExistData.id });
              setClientInfo(clientExistData);
              setOpen(false);
            }}
          >
            Agregar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
