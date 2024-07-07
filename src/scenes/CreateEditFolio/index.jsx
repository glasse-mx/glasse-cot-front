import { useState, useEffect } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { Box, Button, Typography } from "@mui/material";
import Header from "./../../components/Header";
import {
  BillingBlock,
  ClientBlock,
  ItemsListBLock,
  ObservationsBlock,
  ProductSelector,
} from "../../components/orderBlocks";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { coinFormat, useOrderDetails } from "../../utils";
import {
  OrderNewModal,
  OrderEditModal,
  OrderNewVentaModal,
} from "../../components/modals";
import UndoIcon from "@mui/icons-material/Undo";

export const CreateEditFolio = ({ isSale, isEditingSale }) => {
  const auth = useAuthUser(); // Datos de usuario desde Cookies
  const { id } = useParams() || null; // Se obtiene el id del Folio si existe
  const navigate = useNavigate(); // Hook de Navegacion

  const initialOrderValue = {
    created_by: auth.id,
    id_cliente: 0,
    pdv: import.meta.env.VITE_COMPANY_NAME,
    productos: [],
    descuentos: [],
    folio_status_id: 1,
    subtotal_productos: 0,
    subtotal_promos: 0,
    detalles_anticipo: [],
    detalles_pago: [],
    detalles_envio: {},
    observaciones: "",
    salida: "",
    llegada: "",
    pdv_approval: false,
    assistant_approval: false,
    head_approval: false,
    ceo_approval: false,
    total: 0,
  };

  const [order, setOrder] = useState(initialOrderValue);
  const [clientInfo, setClientInfo] = useState(null);
  const [totalPago, setTotalPago] = useState({
    total_anticipos: 0,
    total_pagos: 0,
    total: 0,
  });

  // Si existe el id del folio, se obtienen los datos del mismo
  if (!!id) {
    const { orderDetails } = useOrderDetails(id);

    useEffect(() => {
      setOrder({
        ...order,
        id: orderDetails.id,
        id_cliente:
          !!orderDetails.id_cliente &&
          !!orderDetails.id_cliente.id &&
          orderDetails.id_cliente.id,
        edited_by: auth.id,
        folio_status_id: orderDetails.folio_status_id === "cotizacion" ? 1 : 2,
        productos: orderDetails.productos,
        descuentos: orderDetails.descuentos,
        detalles_anticipo: orderDetails.detalle_anticipo,
        detalles_pago: !!orderDetails.detalles_pago
          ? orderDetails.detalles_pago
          : [],
        detalles_envio: orderDetails.detalles_envio,
        observaciones:
          orderDetails.observaciones !== null ? orderDetails.observaciones : "",
        pdv_approval: orderDetails.pdv_approval === 1 ? true : false,
        assistant_approval:
          orderDetails.assistant_approval === 1 ? true : false,
        head_approval: orderDetails.head_approval === 1 ? true : false,
        ceo_approval: orderDetails.ceo_approval === 1 ? true : false,
      });

      setClientInfo(!!orderDetails.id_cliente && orderDetails.id_cliente);
    }, [orderDetails]);
  }

  const [error, setError] = useState({
    clientError: false,
    productError: false,
    shippingError: false,
    totalError: false,
  });

  // Actualiza el subtotal de los productos
  useEffect(() => {
    setOrder({
      ...order,
      subtotal_productos: order.productos.reduce(
        (acc, prod) => acc + parseFloat(prod.price) * prod.cant,
        0
      ),
      subtotal_promos: order.descuentos.reduce(
        (acc, promo) => acc + promo.cant * promo.valor,
        0
      ),
    });
  }, [order.productos, order.descuentos]);

  // Actualiza el total de la orden
  useEffect(() => {
    setOrder({
      ...order,
      total: order.subtotal_productos - order.subtotal_promos,
    });
  }, [order.subtotal_productos, order.subtotal_promos]);

  // Actualiza el total de los pagos
  useEffect(() => {
    setTotalPago({
      total_anticipos: order.detalles_anticipo.reduce(
        (acc, anticipo) => acc + parseFloat(anticipo.amount),
        0
      ),
      total_pagos: order.detalles_pago.reduce(
        (acc, pago) => acc + parseFloat(pago.amount),
        0
      ),
      total:
        order.detalles_anticipo.reduce(
          (acc, anticipo) => acc + parseFloat(anticipo.amount),
          0
        ) +
        order.detalles_pago.reduce(
          (acc, pago) => acc + parseFloat(pago.amount),
          0
        ),
    });
  }, [order.detalles_anticipo, order.detalles_pago]);

  // Quita el error en Cliente
  useEffect(() => {
    if (order.id_cliente !== 0) {
      setError({
        ...error,
        clientError: false,
      });
    }
  }, [order.id_cliente]);

  // Quita el error en Productos
  useEffect(() => {
    if (order.productos.length !== 0) {
      setError({
        ...error,
        productError: false,
      });
    }
  }, [order.productos]);

  // Quita el error en Envio
  useEffect(() => {
    if (!!order.detalles_envio && order.detalles_envio.tipo) {
      setError({
        ...error,
        shippingError: false,
      });
    }
  }, [order.detalles_envio]);

  // Quita el error en Total
  useEffect(() => {
    if (order.total === totalPago.total) {
      setError({
        ...error,
        totalError: false,
      });
    }
  }, [order.total, totalPago.total]);

  return (
    <Box m='20px'>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Header
          title={isSale ? "Nota De Venta" : "Cotizacion"}
          subtitle={
            isSale
              ? "Crea/Edita una nota de venta"
              : "Crea/Edita una cotizacion"
          }
        />
      </Box>

      {/* Row de Acciones para la cotizacion - Superior */}
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        gap='10px'
        // mt="10px"
      >
        <Button
          variant='contained'
          color='error'
          startIcon={<UndoIcon />}
          onClick={() => (id ? navigate(`/cotizacion/${id}`) : navigate("/"))}
        >
          Volver
        </Button>

        {!id && (
          <OrderNewModal order={order} error={error} setError={setError} />
        )}
        {!!id && !isSale && (
          <OrderEditModal order={order} error={error} setError={setError} />
        )}
        {!!id && isEditingSale && (
          <OrderEditModal
            order={order}
            error={error}
            setError={setError}
            isSale={isSale}
          />
        )}
        {isSale && !isEditingSale && (
          <OrderNewVentaModal
            order={order}
            error={error}
            setError={setError}
            totalPago={totalPago}
          />
        )}
      </Box>

      <Box
        display='flex'
        flexDirection='column'
        mt='20px'
        pb='30px'
        height='65vh'
        sx={{
          overflowY: "scroll",
        }}
      >
        <Box>
          {/* Modulo Manejo de Clientes */}
          <ClientBlock
            order={order}
            setOrder={setOrder}
            error={error.clientError}
            clientInitialData={clientInfo}
            isSale={isSale}
            isEditingSale={isEditingSale}
          />

          {/* Modulo Lista de Productos */}
          {((isSale && isEditingSale) || !isSale) && (
            <ProductSelector
              order={order}
              setOrder={setOrder}
              isEditingSale={isEditingSale}
            />
          )}
          <ItemsListBLock
            order={order}
            setOrder={setOrder}
            error={error.productError}
            errorEnvio={error.shippingError}
            isSale={isSale}
          />

          {/* Modulo Billing - Pago/anticipo + Total */}
          <BillingBlock
            order={order}
            setOrder={setOrder}
            error={error}
            isSale={isSale}
          />

          {totalPago.total <= order.total && (
            <Typography
              color='yellow'
              sx={{
                ml: "1rem",
              }}
            >
              Restante: {coinFormat(order.total - totalPago.total)}
            </Typography>
          )}

          {/* Observaciones */}
          <ObservationsBlock order={order} setOrder={setOrder} />
        </Box>
      </Box>
    </Box>
  );
};
