import axios from "axios";
import { useEffect, useState } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

/**
 * Devuelve el numero telefonico en formato legible por
 * el usuario
 *
 * @param {string} phoneNumberString
 * @returns
 */
export const formatPhoneNumber = (phoneNumberString) => {
  var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  var match = cleaned.replace(/(\d{2})(\d{4})(\d{4})/, "$1-$2-$3");

  return match;
};

/**
 * Devuelve El valor en formato de Moneda Mexicana
 *
 * @param {Float} cantidad
 * @returns
 */
export const coinFormat = (cantidad) => {
  // Opciones de formato de moneda
  const opcionesMoneda = {
    style: "currency",
    currency: "MXN", // Código de moneda para pesos mexicanos
    minimumFractionDigits: 2, // Mínimo de 2 decimales
    maximumFractionDigits: 2, // Máximo de 2 decimales
  };

  return cantidad.toLocaleString("es-MX", opcionesMoneda);
};

/**
 * 
 * @returns Fecha Actual en formato dd/mm/aaaa
 
 */
export const getActualDate = () => {
  const fecha = new Date();
  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1; // Los meses comienzan en 0
  const anio = fecha.getFullYear();

  // Formatea la fecha en el formato dd/mm/aaaa
  const actualDate = `${dia.toString().padStart(2, "0")}/${mes
    .toString()
    .padStart(2, "0")}/${anio}`;

  return actualDate;
};

/**
 * Retorna las Los Metodos de Pago y Bancos disponibles para un cliente
 * @returns {Array} paymentOptions
 *
 */
export const usePaymentOptions = () => {
  const [paymentOptions, setPaymentOptions] = useState([]);

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_BACKEND_BASE_URL}/payment/options`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        setPaymentOptions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return paymentOptions;
};

/**
 * Formatea el numero de Folio de una orden
 * @param {Number} folio
 * @returns {String} folio
 */

export const formatFolio = (folio) => {
  return `GL${folio.toString().padStart(6, "0")}`;
};

/**
 * Retorna los detalles de una orden pasando como parametro el id de la orden
 *
 * @param {Number} idOrder
 * @returns {Object} orderDetails
 */

export const useOrderDetails = (idOrder) => {
  const [orderDetails, setOrderDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const authHeader = useAuthHeader();

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${
        import.meta.env.VITE_BACKEND_BASE_URL
      }/auth/orders/quotes/${idOrder}`,
      headers: {
        Authorization: authHeader,
      },
    };

    axios
      .request(config)
      .then((response) => {
        setOrderDetails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return { orderDetails, loading };
};

/**
 * Retorna la fecha actual para incluir en el datePicker
 *
 *
 */

export const getActualDateForDatePicker = () => {
  const fecha = new Date();
  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1; // Los meses comienzan en 0
  const anio = fecha.getFullYear();

  // Formatea la fecha en el formato aaaa-mm-dd
  const actualDate = `${dia.toString().padStart(2, "0")}/${mes
    .toString()
    .padStart(2, "0")}/${anio.toString()}`;

  return actualDate;
};

/**
 * Verifica si el usuario puede aprobar la orden
 *
 * @param {*} order
 * @returns
 */
export const orderCanBeApproved = (order, appUser) => {
  if (!order || !appUser) {
    return;
  }

  const { user_type } = appUser;

  switch (user_type.id) {
    case 2:
      return !order.pdv_approval ? true : false;

    case 3:
      return order.pdv_approval && !order.assitant_approval ? true : false;

    case 4:
      return order.pdv_approval &&
        order.assitant_approval &&
        !order.head_approval
        ? true
        : false;

    case 5:
      return order.pdv_approval &&
        order.assitant_approval &&
        order.head_approval &&
        !order.ceo_approval
        ? true
        : false;
  }
};

/**
 * Obtiene el estado de aprobacion de una orden
 */

export const getOrderApprovalStatus = (order, appUser) => {
  if (!order || !appUser) {
    return;
  }

  const { user_type } = appUser;

  if (user_type.id === 1) {
    if (order.ceo_approval) {
      return {
        status: "Aprobada por CEO",
        color: "green",
      };
    }

    if (order.head_approval) {
      return {
        status: "Apr. por Tesorería",
        color: "green",
      };
    }

    if (order.assitant_approval) {
      return {
        status: "Apr. por Asistente",
        color: "green",
      };
    }

    if (order.pdv_approval) {
      return {
        status: "Apr. por PDV",
        color: "green",
      };
    }

    return {
      status: "Pendiente",
      color: "yellow",
    };
  }

  switch (user_type.id) {
    case 2:
      return order.pdv_approval
        ? {
            status: "Aprobada",
            color: "green",
          }
        : {
            status: "Pendiente",
            color: "yellow",
          };

    case 3:
      return order.pdv_approval && !order.assitant_approval
        ? {
            status: "Pendiente",
            color: "yellow",
          }
        : {
            status: "Aprobada",
            color: "green",
          };

    case 4:
      if (order.pdv_approval && !order.assitant_approval) {
        return {
          status: "En espera de Asistente",
          color: "orange",
        };
      } else if (
        order.pdv_approval &&
        order.assitant_approval &&
        !order.head_approval
      ) {
        return {
          status: "Pendiente",
          color: "yellow",
        };
      } else if (
        order.pdv_approval &&
        order.assitant_approval &&
        order.head_approval
      ) {
        return {
          status: "Aprobada",
          color: "green",
        };
      }

    case 5:
      return order.ceo_approval
        ? {
            status: "Aprobada",
            color: "green",
          }
        : {
            status: "Pendiente",
            color: "yellow",
          };

    default:
      return {
        status: "Pendiente",
        color: "yellow",
      };
  }
};

export const paymentTypes = [
  {
    id: 1,
    value: "Efectivo: CDMX Sin referencia",
  },
  {
    id: 2,
    value: "Depósito en Efectivo",
  },
  {
    id: 3,
    value: "Transferencia Bancaria",
  },
  {
    id: 4,
    value: "Tarjeta de Crédito",
  },
  {
    id: 5,
    value: "Tarjeta de Débito",
  },
  {
    id: 6,
    value: "Paypal",
  },
  {
    id: 7,
    value: "OpenPay",
  },
  {
    id: 8,
    value: "Stripe",
  },
  {
    id: 9,
    value: "Mercado Pago",
  },
];

export const banks = [
  {
    id: 1,
    bank: "Banorte",
  },
  {
    id: 2,
    bank: "BBVA",
  },
  {
    id: 3,
    bank: "Santander",
  },
  {
    id: 4,
    bank: "Scotiabank",
  },
];

export const getPaymentType = (id) => {
  const paymentType = paymentTypes.find((paymentType) => paymentType.id === id);
  return paymentType.value;
};

export const getBank = (id) => {
  const bank = banks.find((bank) => bank.id === id);
  return bank.bank;
};
