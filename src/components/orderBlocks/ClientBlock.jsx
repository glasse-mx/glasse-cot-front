import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { ClientEditModal, ClientNewModal, ClientSearchModal } from "../modals";
import { formatPhoneNumber } from "../../utils";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

export const ClientBlock = ({
  order,
  setOrder,
  error,
  clientInitialData,
  isSale,
  isEditingSale,
}) => {
  const [openClientSearchModal, setOpenClientSearchModal] = useState(false);
  const [openClientNewModal, setOpenClientNewModal] = useState(false);
  const [openClientEditModal, setOpenClientEditModal] = useState(false);

  const [clientInfo, setClientInfo] = useState({});

  useEffect(() => {
    if (!!clientInitialData) {
      setClientInfo(clientInitialData);
    }
  }, [clientInitialData]);

  const handleRemoveClient = () => {
    setOrder({
      ...order,
      id_cliente: 0,
    });
    setClientInfo({});

    setOpenClientNewModal(false);
    setOpenClientSearchModal(false);
    setOpenClientEditModal(false);
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      gap='15px'
      alignItems='center'
      justifyContent='center'
      sx={{
        minHeight: "150px",
      }}
      border={error ? "1px solid red" : "none"}
      borderRadius='10px'
    >
      {order.id_cliente == 0 && (
        <>
          <Typography
            variant='h4'
            component='h4'
            sx={{
              fontWeight: 600,
              textTransform: "uppercase",
            }}
          >
            Agrega o Busca un cliente
          </Typography>

          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            gap='10px'
          >
            <Button
              variant='contained'
              color='info'
              onClick={() => setOpenClientNewModal(true)}
            >
              <PersonAddAltIcon />
              Cliente Nuevo
            </Button>

            <ClientNewModal
              open={openClientNewModal}
              set={setOpenClientNewModal}
              order={order}
              setOrder={setOrder}
              setClientInfo={setClientInfo}
            />

            <Button
              variant='contained'
              color='info'
              onClick={() => setOpenClientSearchModal(true)}
            >
              <PersonSearchIcon />
              Cliente Existente
            </Button>

            <ClientSearchModal
              open={openClientSearchModal}
              set={setOpenClientSearchModal}
              order={order}
              setOrder={setOrder}
              setClientInfo={setClientInfo}
            />
          </Box>
          {error && (
            <Typography color='error'>
              No olvides agregar un cliente para poder continuar
            </Typography>
          )}
        </>
      )}

      {order.id_cliente != 0 && (
        <>
          {((isSale && isEditingSale) ||
            (!isSale)) && (
              <Box display='flex' gap='18px'>
                <Button
                  variant='contained'
                  color='info'
                  onClick={() => setOpenClientEditModal(true)}
                >
                  <EditIcon />
                  Editar
                </Button>

                <ClientEditModal
                  open={openClientEditModal}
                  set={setOpenClientEditModal}
                  order={order}
                  setOrder={setOrder}
                  clientInfo={clientInfo}
                  setClientInfo={setClientInfo}
                />

                <Button
                  variant='contained'
                  color='error'
                  onClick={handleRemoveClient}
                >
                  <PersonRemoveIcon />
                  Quitar
                </Button>
              </Box>
            )}

          <Box display='flex' gap='18px'>
            <Box>
              <Typography
                variant='h5'
                component='h5'
                sx={{
                  fontWeight: 600,
                  textTransform: "uppercase",
                }}
              >
                Detalles de Cliente
              </Typography>

              <Typography component='p'>
                {clientInfo.first_name} {clientInfo.last_name}
              </Typography>

              <Typography component='p'>
                {formatPhoneNumber(clientInfo.phone)}
              </Typography>

              <Typography component='p'>{clientInfo.email}</Typography>
            </Box>

            {order.id_cliente != 0 && clientInfo.address_street != null && (
              <Box>
                <Typography
                  variant='h5'
                  component='h5'
                  sx={{
                    fontWeight: 600,
                    textTransform: "uppercase",
                  }}
                >
                  Direccion de Facturación
                </Typography>

                <Typography component='p'>
                  {`${clientInfo.address_street} ${clientInfo.address_ext}, ${
                    clientInfo.address_int != null
                      ? `interior ${clientInfo.address_int}`
                      : ""
                  }`}
                </Typography>

                <Typography component='p'>
                  {`${clientInfo.address_col && `${clientInfo.address_col}, `}${
                    clientInfo.address_town
                  } ${clientInfo.address_state}`}
                </Typography>

                <Typography component='p'>
                  {clientInfo.address_zip && clientInfo.address_zip}
                </Typography>
              </Box>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};
