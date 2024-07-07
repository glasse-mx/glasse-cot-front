import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

export const FormCustom = ({ order, setOrder, closeModal }) => {
  const initialCustomValue = {
    id: "c" + order.productos.length,
    sku: "NA",
    name: "",
    price: "0",
    cant: 1,
    serial: "NA",
    subtotal: 0,
  };

  const [customValue, setCustomValue] = useState(initialCustomValue);
  const [errorCustom, setErrorCustom] = useState(false);

  const onCustomChange = (e) => {
    const { name, value } = e.target;
    setCustomValue({
      ...customValue,
      [name]: value,
    });
  };

  useEffect(() => {
    setCustomValue({
      ...customValue,
      subtotal: customValue.cant * customValue.price,
    });
  }, [customValue.cant, customValue.price]);

  const handleAddCustom = (e) => {
    if (customValue.name === "") {
      setErrorCustom(true);
      return;
    }

    setOrder({
      ...order,
      productos: [...order.productos, customValue],
    });
    closeModal(false);
  };

  return (
    <Box>
      <Box
        display='flex'
        justifyContent='center'
        margin='10px 0'
        height='250px'
      >
        <img
          src={`../../assets/custom-prod.png`}
          alt='Este producto no tiene imagen definida'
        />
      </Box>
      <Box display='flex' margin='10px 0'>
        <TextField
          name='name'
          label='Descripcion'
          value={customValue.name}
          onChange={onCustomChange}
          fullWidth
          required
          error={errorCustom}
          helperText={errorCustom && "Este campo es requerido"}
        />
      </Box>
      <Box display='flex' gap='10px' margin='10px 0'>
        <FormControl fullWidth>
          <InputLabel id='Category-selector'>Categoria</InputLabel>
          <Select
            labelId='Category-selector'
            id='Category'
            value={customValue.categories}
            label='Categoria'
            name='categories'
            onChange={onCustomChange}
            fullWidth
          >
            <MenuItem value='maquinas'>Maquina</MenuItem>
            <MenuItem value='insumos'>Insumo</MenuItem>
            <MenuItem value='reguladores'>Reguladores</MenuItem>
            <MenuItem value='envios'>Envio</MenuItem>
            <MenuItem value='otros'>Otros</MenuItem>
          </Select>
        </FormControl>
        <TextField
          name='cant'
          label='cant.'
          type='number'
          value={customValue.cant}
          onInput={onCustomChange}
          fullWidth
        />
        <TextField
          name='price'
          label='Precio'
          type='number'
          value={customValue.price}
          onChange={onCustomChange}
          fullWidth
        />
      </Box>

      <Box></Box>

      <Box margin='15px 0'>
        <Typography variant='h4' component='h6' textTransform='uppercase'>
          Subtotal:{" "}
          {customValue.cant && customValue.price
            ? customValue.cant * customValue.price
            : 0}
        </Typography>
      </Box>

      {/* <input
            type="number"
            disabled
            name="subtotal"
            // ref={subtotalRef}
            value={(customValue.cant && customValue.price) ? customValue.cant * customValue.price : 0}

        /> */}
      <Box display='flex' justifyContent='center' margin='10px 0'>
        <Button onClick={handleAddCustom} color='info' variant='contained'>
          Agregar Producto
        </Button>
      </Box>
    </Box>
  );
};
