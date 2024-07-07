import {
  Box,
  Typography,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

export const FormShipping = ({ order, setOrder, setIsAddingShipping }) => {
  const shippingCompanies = [
    { id: 1, name: "3 Guerras" },
    { id: 2, name: "Castores" },
    { id: 3, name: "Otros" },
  ];

  const shippingTypes = [
    { id: 1, name: "Punto Ocurre" },
    { id: 2, name: "Domicilio" },
    { id: 3, name: "Sala de Exhibicion" },
  ];

  const initialShippingValue = {
    tipo: "",
    empresa: "",
    direccion: {},
  };

  const [shippingValue, setShippingValue] = useState(initialShippingValue);
  const [sameShippingAddress, setSameShippingAddress] = useState(false);
  const [errorAddress, setErrorAddress] = useState(false);
  const [clientInfo, setClientInfo] = useState({});
  const authHeader = useAuthHeader();

  const { id_cliente } = order;

  useEffect(() => {
    if (id_cliente != 0) {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${
          import.meta.env.VITE_BACKEND_BASE_URL
        }/auth/client/${id_cliente}`,
        headers: {
          Authorization: authHeader,
        },
      };

      axios
        .request(config)
        .then((response) => {
          setClientInfo(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleShippingChange = (e) => {
    setShippingValue({
      ...shippingValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleShippingAddressChange = (e) => {
    setShippingValue({
      ...shippingValue,
      direccion: {
        ...shippingValue.direccion,
        [e.target.name]: e.target.value,
      },
    });
  };

  useEffect(() => {
    if (!sameShippingAddress) {
      setShippingValue({
        ...shippingValue,
        direccion: {
          calle: "",
          exterior: "",
          interior: "",
          colonia: "",
          ciudad: "",
          estado: "",
          cp: "",
        },
      });
    } else {
      setShippingValue({
        ...shippingValue,
        direccion: {
          calle: clientInfo.address_street,
          exterior: clientInfo.address_ext,
          interior: clientInfo.address_int,
          colonia: clientInfo.address_col,
          ciudad: clientInfo.address_town,
          estado: clientInfo.address_state,
          cp: clientInfo.address_zip,
        },
      });
    }
  }, [sameShippingAddress]);

  const handleSetShipping = () => {
    if (shippingValue.tipo === "Punto Ocurre") {
      if (shippingValue.direccion === null) {
        setErrorAddress(true);
        return;
      }
    }

    if (shippingValue.tipo === "Domicilio") {
      if (
        shippingValue.direccion.calle === "" ||
        shippingValue.direccion.numero === "" ||
        shippingValue.direccion.colonia === "" ||
        shippingValue.direccion.cp === "" ||
        shippingValue.direccion.ciudad === "" ||
        shippingValue.direccion.estado === ""
      ) {
        setErrorAddress(true);
        return;
      }
    }

    setOrder({
      ...order,
      detalles_envio: shippingValue,
    });

    setIsAddingShipping(false);
  };

  return (
    <Box display='flex' flexDirection='column' gap='15px'>
      <Box display='flex' gap='10px'>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id='shippingType'>Tipo</InputLabel>
          <Select
            labelId='shippingType'
            label='Tipo'
            name='tipo'
            value={shippingValue.tipo}
            onChange={handleShippingChange}
          >
            {shippingTypes.map((type) => (
              <MenuItem key={type.id} value={type.name}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {shippingValue.tipo === "Punto Ocurre" && !sameShippingAddress && (
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id='shippingCompany'>Empresa</InputLabel>
            <Select
              labelId='shippingCompany'
              label='Empresa'
              name='empresa'
              value={shippingValue.empresa}
              onChange={handleShippingChange}
            >
              {shippingCompanies.map((company) => (
                <MenuItem key={company.id} value={company.name}>
                  {company.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {shippingValue.tipo === "Domicilio" && (
          <FormControlLabel
            control={
              <Checkbox
                checked={sameShippingAddress}
                onChange={() => setSameShippingAddress(!sameShippingAddress)}
                name='sameShippingAddress'
                color='info'
              />
            }
            label='Usar Direccion de Facturacion como Direccion de Envio'
          />
        )}
      </Box>

      {/* formulario de envio */}
      <Box display='flex' flexDirection='column' gap='10px'>
        {shippingValue.tipo === "Punto Ocurre" && (
          <Box
            display='flex'
            flexDirection={{ xs: "column", md: "row" }}
            gap='10px'
            p='10px'
            borderRadius='8px'
            border={errorAddress ? "solid red 1px" : "none"}
          >
            <TextField
              fullWidth
              label='Ciudad'
              variant='outlined'
              name='ciudad'
              onChange={handleShippingAddressChange}
            />
            <TextField
              fullWidth
              label='Estado'
              variant='outlined'
              name='estado'
              onChange={handleShippingAddressChange}
            />
            <TextField
              fullWidth
              label='Municipio'
              variant='outlined'
              name='municipio'
              onChange={handleShippingAddressChange}
            />
          </Box>
        )}

        {shippingValue.tipo === "Domicilio" && !sameShippingAddress && (
          <>
            <Box
              display='grid'
              gridTemplateColumns={{ sm: "1fr", md: "2fr 2fr 1fr" }}
              gap='15px'
            >
              <TextField
                disabled={sameShippingAddress}
                variant='outlined'
                label='Calle'
                name='calle'
                value={shippingValue.direccion.calle}
                onChange={handleShippingAddressChange}
                required
              />
              <TextField
                disabled={sameShippingAddress}
                variant='outlined'
                label='N. Exterior'
                name='exterior'
                value={shippingValue.direccion.exterior}
                onChange={handleShippingAddressChange}
                required
              />
              <TextField
                disabled={sameShippingAddress}
                variant='outlined'
                label='N. Interior'
                name='interior'
                value={shippingValue.direccion.interior}
                onChange={handleShippingAddressChange}
              />
            </Box>

            <Box
              display='grid'
              gridTemplateColumns={{ sm: "1fr", md: "1fr 1fr 1fr 0.5fr" }}
              gap='15px'
            >
              <TextField
                disabled={sameShippingAddress}
                variant='outlined'
                label='Colonia'
                name='colonia'
                value={shippingValue.direccion.colonia}
                onChange={handleShippingAddressChange}
                required
              />
              <TextField
                disabled={sameShippingAddress}
                variant='outlined'
                label='Ciudad'
                name='ciudad'
                value={shippingValue.direccion.ciudad}
                onChange={handleShippingAddressChange}
                required
              />

              <TextField
                disabled={sameShippingAddress}
                variant='outlined'
                label='Estado'
                name='estado'
                value={shippingValue.direccion.estado}
                onChange={handleShippingAddressChange}
                required
              />
              <TextField
                disabled={sameShippingAddress}
                variant='outlined'
                label='Codigo Postal'
                name='cp'
                value={shippingValue.direccion.cp}
                onChange={handleShippingAddressChange}
                required
              />
            </Box>
          </>
        )}
      </Box>

      {/* Botones de accion */}
      <Box display='flex' justifyContent='center' gap='10px' m='10px 0'>
        <Button
          variant='contained'
          color='error'
          onClick={() => setIsAddingShipping(false)}
        >
          Cancelar
        </Button>

        <Button variant='contained' color='success' onClick={handleSetShipping}>
          Agregar Envio
        </Button>
      </Box>
    </Box>
  );
};
