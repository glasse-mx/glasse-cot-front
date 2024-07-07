import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useState } from "react";
import axios from "axios";
import { ClientExistModal } from "./ClientExistModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  maxWidth: "1000.px",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

export const ClientNewModal = ({
  open,
  set,
  order,
  setOrder,
  setClientInfo,
}) => {
  const authHeader = useAuthHeader();

  const initialClientValue = {
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    address_street: "",
    address_int: "",
    address_ext: "",
    address_col: "",
    address_town: "",
    address_state: "",
    address_zip: "",
  };

  const [clientData, setClientData] = useState(initialClientValue);
  const [clientExist, setClientExist] = useState(false);
  const [clientExistData, setClientExistData] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientData({ ...clientData, [name]: value });
  };

  const handleAddClient = (e) => {
    e.preventDefault();

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/clients`,
      headers: {
        Authorization: authHeader,
      },
      data: clientData,
    };

    axios
      .request(config)
      .then((res) => {
        console.log(res.data);
        // setOrder({ ...order, id_cliente: res.data.id });
        // setClientInfo(clientData);
        // set(false);
      })
      .catch((err) => {
        console.error(err);
        setClientExist(true);
        setClientExistData(err.response.data.cliente);
      });
  };

  return (
    <Modal
      open={open}
      onClose={() => set(false)}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Typography
          id='modal-modal-title'
          variant='h3'
          component='h3'
          sx={{
            fontWeight: 600,
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          Crear Nuevo Cliente
        </Typography>

        {clientExist && (
          <ClientExistModal
            open={clientExist}
            setOpen={setClientExist}
            setClientData={setClientData}
            order={order}
            setOrder={setOrder}
            setClientInfo={setClientInfo}
            clientExistData={clientExistData}
          />
        )}

        <Box>
          <form>
            <Box display='flex' flexDirection='column' gap='15px'>
              <Box
                display='grid'
                gridTemplateColumns={{ sm: "1fr", md: "repeat(2, 1fr)" }}
                gap='15px'
              >
                <TextField
                  name='first_name'
                  label='Nombres'
                  variant='outlined'
                  margin='normal'
                  value={clientData.first_name}
                  onChange={handleInputChange}
                  required
                />
                <TextField
                  name='last_name'
                  label='Apellidos'
                  variant='outlined'
                  margin='normal'
                  value={clientData.last_name}
                  onChange={handleInputChange}
                  required
                />
              </Box>

              <Box
                display='grid'
                gridTemplateColumns={{ sm: "1fr", md: "repeat(2, 1fr)" }}
                gap='15px'
              >
                <TextField
                  variant='outlined'
                  label='Telefono'
                  name='phone'
                  value={clientData.phone}
                  onChange={handleInputChange}
                  required
                />
                <TextField
                  variant='outlined'
                  type='email'
                  label='Correo Electronico'
                  name='email'
                  value={clientData.email}
                  onChange={handleInputChange}
                />
              </Box>

              <Box
                display='grid'
                gridTemplateColumns={{ sm: "1fr", md: "2fr 2fr 1fr" }}
                gap='15px'
              >
                <TextField
                  variant='outlined'
                  label='Calle'
                  name='address_street'
                  value={clientData.address_street}
                  onChange={handleInputChange}
                  required
                />
                <TextField
                  variant='outlined'
                  label='N. Exterior'
                  name='address_ext'
                  value={clientData.address_ext}
                  onChange={handleInputChange}
                  required
                />
                <TextField
                  variant='outlined'
                  label='N. Interior'
                  name='address_int'
                  value={clientData.address_int}
                  onChange={handleInputChange}
                />
              </Box>

              <Box
                display='grid'
                gridTemplateColumns={{ sm: "1fr", md: "1fr 1fr 1fr 0.5fr" }}
                gap='15px'
              >
                <TextField
                  variant='outlined'
                  label='Colonia'
                  name='address_col'
                  value={clientData.address_col}
                  onChange={handleInputChange}
                  required
                />
                <TextField
                  variant='outlined'
                  label='Municipio'
                  name='address_town'
                  value={clientData.address_town}
                  onChange={handleInputChange}
                  required
                />

                <TextField
                  variant='outlined'
                  label='Estado'
                  name='address_state'
                  value={clientData.address_state}
                  onChange={handleInputChange}
                  required
                />
                <TextField
                  variant='outlined'
                  label='Codigo Postal'
                  name='address_zip'
                  value={clientData.address_zip}
                  onChange={handleInputChange}
                  required
                />
              </Box>

              <Button
                type='submit'
                onClick={handleAddClient}
                className='btn-primary'
                variant='contained'
                sx={{
                  marginTop: "20px",
                }}
              >
                Guardar
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Modal>
  );
};
