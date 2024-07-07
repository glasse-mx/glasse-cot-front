import { Modal, Box, Button, Typography, TextField } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useState, useEffect } from "react";
import { coinFormat } from "../../utils";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  maxWidth: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

export const FormAddProductModalChild = ({ order, setOrder, item }) => {
  const [open, setOpen] = useState(false);

  const { categories } = item;
  const itemCat = categories.find((cat) => cat.slug === "maquinas")
    ? "maquinas"
    : categories.find((cat) => cat.slug === "reguladores")
    ? "reguladores"
    : "insumos";

  const [product, setProduct] = useState({
    id: item.id,
    sku: item.sku,
    name: item.name,
    price: item.price,
    categories: itemCat,
    cant: 1,
    subtotal: item.price,
  });

  useEffect(() => {
    setProduct({
      ...product,
      subtotal: parseFloat(product.price) * parseInt(product.cant),
    });
  }, [product.cant]);

  return (
    <>
      <Button
        variant='contained'
        color='info'
        sx={{
          m: "0 auto",
        }}
        onClick={() => setOpen(true)}
      >
        <ControlPointIcon />
        Agregar
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography
            variant='h4'
            component='h3'
            sx={{
              textAlign: "center",
              mb: "20px",
            }}
          >
            {item.name}
          </Typography>

          <Box
            display='flex'
            flexDirection={{ md: "column", sm: "row" }}
            gap='15px'
            alignItems='center'
          >
            <Box
              height='300px'
              width='300px'
              sx={{
                "& img": {
                  height: "100%",
                  width: "100%",
                  objectFit: "contain",
                },
              }}
            >
              <img src={item.img} alt='' />
            </Box>

            <Box>
              <Typography
                variant='h5'
                sx={{
                  fontWeight: "bold",
                }}
              >
                {item.name}
              </Typography>

              <Typography
                variant='h6'
                sx={{
                  fontWeight: "bold",
                }}
              >
                {item.categories.map((cat) => cat.name).join(", ")}
              </Typography>

              <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                m='10px 0'
              >
                {item.stock_status === "instock" ? (
                  <Typography
                    sx={{
                      color: "green",
                    }}
                  >
                    Disponible
                  </Typography>
                ) : (
                  <Typography
                    sx={{
                      color: "red",
                    }}
                  >
                    No disponible
                  </Typography>
                )}

                <Typography
                  variant='h5'
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  {coinFormat(parseFloat(item.price))}
                </Typography>
              </Box>

              <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                m='10px 0'
              >
                <TextField
                  id='qty'
                  label='Cantidad'
                  variant='outlined'
                  name='qty'
                  type='number'
                  value={product.cant}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      cant: e.target.value,
                    })
                  }
                  min={1}
                  inputProps={{
                    min: 1,
                    max: item.stock_quantity || 10,
                  }}
                />

                <Typography
                  variant='h3'
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  {coinFormat(parseFloat(product.subtotal))}
                </Typography>
              </Box>
            </Box>

            <Button
              variant='contained'
              color='info'
              sx={{
                m: "0 auto",
              }}
              onClick={() => {
                if (order.productos.find((prod) => prod.id === product.id)) {
                  setOrder({
                    ...order,
                    productos: order.productos.map((prod) => {
                      if (prod.id === product.id) {
                        return {
                          ...prod,
                          cant: parseInt(prod.cant) + parseInt(product.cant),
                          subtotal:
                            parseFloat(prod.subtotal) +
                            parseFloat(product.subtotal),
                        };
                      }
                    }),
                  });
                } else {
                  setOrder({
                    ...order,
                    productos: [...order.productos, product],
                  });
                }
                setOpen(false);
              }}
            >
              <CheckCircleIcon />
              Agregar
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
