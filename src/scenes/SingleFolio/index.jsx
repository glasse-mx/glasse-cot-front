import { Box, Typography, CircularProgress, Button } from "@mui/material";
import Header from "./../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useParams } from "react-router-dom";
import {
  OrderBanner,
  OrderClient,
  OrderApproval,
  OrderItems,
  OrderBilling,
  OrderComments,
  OrderFooter,
} from "../../components/invoiceBlocks";
import { formatFolio, orderCanBeApproved } from "../../utils";
import generatePDF from "react-to-pdf";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import EditIcon from "@mui/icons-material/Edit";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { OrderCancelModal, OrderAppovalModal } from "../../components/modals";
import { useNavigate } from "react-router-dom";

export const SingleFolio = ({ title = "" }) => {
  let { id } = useParams() || null;
  const authHeader = useAuthHeader();
  const appUser = useAuthUser();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/orders/quotes/${id}`,
      headers: {
        Authorization: authHeader,
      },
    };

    axios
      .request(config)
      .then((res) => {
        setOrder(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const options = {
    filename:
      order?.folio_status_id === "nota_creada"
        ? `nota-venta-${formatFolio(id)}.pdf`
        : `cotizacion-${formatFolio(id)}.pdf`,
  };

  const pdfTarget = () => document.querySelector("#invoicePaper");

  return (
    <Box
      m='20px'
      display='grid'
      gridTemplateColumns={{ md: "auto 300px", sm: "1fr" }}
    >
      <Box>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Header
            title={title}
            subtitle={`Cliente: ${order?.id_cliente?.first_name} ${order?.id_cliente?.last_name}`}
          />
        </Box>

        {!loading && order.folio_status_id != "nota_cancelada" && (
          <>
            <Box display='flex' justifyContent='center' gap='15px' mb='10px'>
              <Button
                variant='contained'
                color='info'
                onClick={() => generatePDF(pdfTarget, options)}
              >
                Imprimir
                <PictureAsPdfIcon />
              </Button>

              {order.folio_status_id === "cotizacion" &&
                order.created_by.id === appUser.id && (
                  <Button
                    variant='contained'
                    color='info'
                    onClick={() => navigate(`/cotizacion/${order.id}/editar`)}
                  >
                    Editar
                    <EditIcon />
                  </Button>
                )}

              {order.folio_status_id === "nota_creada" &&
                appUser.user_type.type != "vendedor" && (
                  <Button
                    variant='contained'
                    color='info'
                    onClick={() => navigate(`/notas-venta/${order.id}/editar`)}
                  >
                    Editar
                    <EditIcon />
                  </Button>
                )}

              {order.folio_status_id === "nota_creada" &&
                orderCanBeApproved(order, appUser) && (
                  <OrderAppovalModal order={order} />
                )}

              {order.folio_status_id === "cotizacion" &&
                order.created_by.id === appUser.id && (
                  <Button
                    variant='contained'
                    color='success'
                    onClick={() => navigate(`/nueva-venta/${order.id}`)}
                  >
                    Crear Nota de Venta
                    <AttachMoneyIcon />
                  </Button>
                )}

              <OrderCancelModal order={order} />
            </Box>
            {order.folio_status_id === "nota_creada" && (
              <Box
                display='flex'
                flexDirection='column'
                // gap="10px"
                m='10px 0'
              >
                <Typography textAlign='center'>Aprobado por:</Typography>
                <OrderApproval order={order} />
              </Box>
            )}
          </>
        )}

        <Box
          // mt="20px"
          display='flex'
          flexDirection='column'
          height={
            !loading && order.folio_status_id !== "nota_cancelada"
              ? order.folio_status_id === "cotizacion"
                ? "75vh"
                : "60vh"
              : "75vh"
          }
          sx={{
            overflowY: "scroll",
          }}
        >
          <Box
            id='invoicePaper'
            position='relative'
            bgcolor='white'
            boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
            borderRadius='10px'
            p='20px'
            m='0px auto 0'
            sx={{
              width: "800px",
              minHeight: "1100px",
              mb: "50px",
              "& *": {
                color: "#11181C",
              },
            }}
          >
            {loading ? (
              <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                height='100%'
              >
                <CircularProgress />
              </Box>
            ) : (
              <>
                <Box
                  display='flex'
                  flexDirection='column'
                  justifyContent='space-between'
                  height='100%'
                >
                  <Box>
                    <OrderBanner order={order} />

                    <OrderClient order={order} />

                    <OrderItems order={order} />

                    <OrderBilling order={order} />

                    <OrderComments order={order} />
                  </Box>

                  <Box
                    display='grid'
                    gridTemplateColumns='1fr 1fr'
                    gap='10px'
                    alignItems='end'
                    sx={{
                      borderTop: "1px solid #ccc",
                      borderBottom: "1px solid #ccc",
                      p: "10px 0",
                    }}
                  >
                    <Box>
                      <Typography
                        variant='h6'
                        sx={{
                          fontWeight: "700",
                        }}
                      >
                        Disclaimer
                      </Typography>
                      <Typography fontSize='10px'>
                        Este documento no es una factura fiscal, es un
                        comprobante de que usted como cliente hizo una compra de
                        los productos mencionados a <b>Glasse</b>.
                      </Typography>
                      <Typography fontSize='10px'>
                        Este documento se puede usar para reclamos de garantía,
                        la cual tiene duración de un año por defectos de
                        fábrica, si usted adquirió un regulador de voltaje para
                        su máquina, la garantía se extiende a partes eléctricas.{" "}
                      </Typography>
                    </Box>
                    <Box>
                      <Box>
                        <Box
                          display='grid'
                          gridTemplateColumns='1fr 1fr'
                          gap='8px'
                        >
                          <Box
                            display='flex'
                            flexDirection='column'
                            alignItems='center'
                            pt='4px'
                            sx={{ borderTop: "solid 1px #333" }}
                          >
                            <Typography>
                              <b>Tesorería</b>
                            </Typography>
                          </Box>

                          <Box
                            display='flex'
                            flexDirection='column'
                            alignItems='center'
                            pt='4px'
                            sx={{ borderTop: "solid 1px #333" }}
                          >
                            <Typography>
                              <b>Dirección General</b>
                            </Typography>
                          </Box>
                        </Box>

                        <Typography
                          variant='h6'
                          textAlign='center'
                          sx={{
                            fontWeight: "700",
                            pt: "2px",
                          }}
                        >
                          Firmas Autorizadas
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                {order.folio_status_id === "nota_cancelada" && (
                  <Box
                    position='absolute'
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    width='100%'
                    height='100%'
                    top='0'
                    left='0'
                    overflow='hidden'
                  >
                    <Typography
                      variant='h1'
                      sx={{
                        // top: "50%",
                        // left: "50%",
                        transform: "rotate(-45deg)  ",
                        color: "red !important",
                        fontSize: "10rem",
                        fontWeight: "700",
                        zIndex: "10",
                        // transform: "rotate(-45deg)"
                      }}
                    >
                      CANCELADA
                    </Typography>
                  </Box>
                )}
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
