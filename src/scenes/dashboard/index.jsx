import Header from "./../../components/Header";
import { Box, Typography, CircularProgress, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { DataGrid } from "@mui/x-data-grid";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import axios from "axios";
import { useEffect, useState } from "react";
import { coinFormat } from "../../utils";
import EventIcon from "@mui/icons-material/Event";

const AppDashboard = () => {
  const auth = useAuthUser();
  const authHeader = useAuthHeader();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [records, setRecords] = useState({});
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const obtenerFechaActual = () => {
    const meses = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];
    const fecha = new Date();
    const dia = fecha.getDate();
    const mes = meses[fecha.getMonth()];
    const año = fecha.getFullYear();
    return `Hoy es ${dia} de ${mes} de ${año}`;
  };

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/sumary`,
      headers: {
        Authorization: authHeader,
      },
    };

    axios(config)
      .then((response) => {
        setRecords(response.data);
        const { agentes } = records;
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const calcularSumaColumna = (nombreColumna) => {
      let suma = 0;
      for (const id in agentes) {
        suma += agentes[id][nombreColumna] || 0;
      }
      return suma;
    };

    const { agentes } = records;
    const rows = [];
    for (const id in agentes) {
      const row =
        records.semanas === 5
          ? {
              id: id,
              vendedor: agentes[id].vendedor,
              anticipos: agentes[id].anticipos,
              "semana-1": agentes[id]["semana-1"],
              "semana-2": agentes[id]["semana-2"],
              "semana-3": agentes[id]["semana-3"],
              "semana-4": agentes[id]["semana-4"],
              "semana-5": agentes[id]["semana-5"],
            }
          : {
              id: id,
              vendedor: agentes[id].vendedor,
              anticipos: agentes[id].anticipos,
              "semana-1": agentes[id]["semana-1"],
              "semana-2": agentes[id]["semana-2"],
              "semana-3": agentes[id]["semana-3"],
              "semana-4": agentes[id]["semana-4"],
            };
      rows.push(row);
    }

    const totales =
      records.semanas === 5
        ? {
            id: "totales",
            vendedor: "TOTAL",
            anticipos: calcularSumaColumna("anticipos"),
            "semana-1": calcularSumaColumna("semana-1"),
            "semana-2": calcularSumaColumna("semana-2"),
            "semana-3": calcularSumaColumna("semana-3"),
            "semana-4": calcularSumaColumna("semana-4"),
            "semana-5": calcularSumaColumna("semana-5"),
          }
        : {
            id: "totales",
            vendedor: "TOTAL",
            anticipos: calcularSumaColumna("anticipos"),
            "semana-1": calcularSumaColumna("semana-1"),
            "semana-2": calcularSumaColumna("semana-2"),
            "semana-3": calcularSumaColumna("semana-3"),
            "semana-4": calcularSumaColumna("semana-4"),
          };
    rows.push(totales);

    setRows(rows);
  }, [records]);

  const columns =
    records.semanas != 5
      ? [
          { field: "vendedor", headerName: "Vendedor", flex: 1 },
          { field: "semana-1", headerName: "Sem. 1", flex: 0.5 },
          { field: "semana-2", headerName: "Sem. 2", flex: 0.5 },
          { field: "semana-3", headerName: "Sem. 3", flex: 0.5 },
          { field: "semana-4", headerName: "Sem. 4", flex: 0.5 },
          { field: "anticipos", headerName: "Anticipos", flex: 0.5 },
        ]
      : [
          { field: "vendedor", headerName: "Vendedor", flex: 1 },
          { field: "semana-1", headerName: "Sem. 1", flex: 0.5 },
          { field: "semana-2", headerName: "Sem. 2", flex: 0.5 },
          { field: "semana-3", headerName: "Sem. 3", flex: 0.5 },
          { field: "semana-4", headerName: "Sem. 4", flex: 0.5 },
          { field: "semana-5", headerName: "Sem. 5", flex: 0.5 },
          { field: "anticipos", headerName: "Anticipos", flex: 0.5 },
        ];

  return (
    <Box m='20px'>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Header title='Dashboard' subtitle={`Bienvenid@ ${auth.name}`} />
      </Box>

      {loading ? (
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          height='75vh'
          maxWidth='900px'
        >
          <CircularProgress color='info' />
        </Box>
      ) : (
        <Box maxWidth='1100px' width='80%'>
          <Box>
            <Typography
              variant='h3'
              sx={{
                fontWeight: "bold",
              }}
            >
              <EventIcon />
              {obtenerFechaActual()}
            </Typography>
          </Box>

          <Box
            display='grid'
            gridTemplateColumns={{ sm: "1fr", md: "auto 250px" }}
            gap='10px'
            mt='20px'
          >
            <Box
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                },
                "& .name-column--cell": {
                  color: colors.greenAccent[300],
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: colors.blueAccent[700],
                  borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: colors.primary[400],
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: "none",
                  backgroundColor: colors.blueAccent[700],
                },
                "& .MuiCheckbox-root": {
                  color: `${colors.greenAccent[200]} !important`,
                },
              }}
            >
              <DataGrid rows={rows} columns={columns} />
            </Box>

            <Box>
              <Typography
                variant='h4'
                sx={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  textDecoration: "underline",
                  mb: "10px",
                }}
              >
                TOTALES
              </Typography>

              <Box
                display='grid'
                gridTemplateColumns='1fr 1fr'
                gap='10px'
                m='10px 0'
                alignItems='center'
              >
                <Typography>Maquinas:</Typography>
                <Typography textAlign='right'>{records.maquinas}</Typography>
                <Typography>Reguladores:</Typography>
                <Typography textAlign='right'>{records.reguladores}</Typography>
                <Typography>Insumos:</Typography>
                <Typography textAlign='right'>{records.insumos}</Typography>
                <Typography>VENTAS TOTALES:</Typography>
                <Typography textAlign='right'>{records.ventas}</Typography>
              </Box>

              <Box
                display='flex'
                flexDirection='column'
                gap='8px'
                p='8px'
                justifyContent='center'
                alignItems='center'
                border='solid 1px #ccc'
                borderRadius='10px'
              >
                <Typography
                  variant='h6'
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Total Ingresado:
                </Typography>
                <Typography
                  variant='h5'
                  sx={{
                    fontWeight: "bold",
                    color: colors.greenAccent[300],
                  }}
                >
                  {`MXN ${coinFormat(records.total)}`}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AppDashboard;
