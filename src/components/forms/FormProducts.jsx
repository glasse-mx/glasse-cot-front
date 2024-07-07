import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import LinearProgress from "@mui/material/LinearProgress";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import axios from "axios";
import { coinFormat } from "../../utils";
import { FormAddProductModalChild } from "../modals";
import { tokens } from "../../theme";

// Declaracion de credenciales de API de Woocommerce
const url = import.meta.env.VITE_WOOCOMMERCE_API_URL;
const username = import.meta.env.VITE_WOOCOMMERCE_CONSUMER_KEY;
const password = import.meta.env.VITE_WOOCOMMERCE_SECRET_KEY;
const basicAuth = "Basic " + btoa(username + ":" + password);

export const FormProducts = ({ order, setOrder, modal }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const productColumns = [
    {
      field: "sku",
      headerName: "SKU",
      flex: 0.25,
    },
    {
      field: "name",
      headerName: "Articulo",
      flex: 1,
    },
    {
      field: "categories",
      valueGetter: (params) => params.row.categories[0].name,
      headerName: "Categoria",
      flex: 0.5,
    },
    {
      field: `price`,
      // valueGetter: (params) => params.row.sale_price ? coinFormat(params.row.sale_price) : coinFormat(params.row.regular_price),
      headerName: "P. Unitario",
      flex: 0.5,
    },
    {
      field: "stock_quantity",
      valueGetter: (params) =>
        params.row.stock_quantity ? params.row.stock_quantity : "N/A",
      headerName: "Disp.",
      flex: 0.25,
    },
    {
      field: "actions",
      headerName: "",
      flex: 0.5,
      renderCell: (params) => (
        <FormAddProductModalChild
          order={order}
          setOrder={setOrder}
          item={params.row}
          modal={modal}
        />
      ),
    },
  ];

  const [search, setSearch] = useState("");
  const [errorSearch, setErrorSearch] = useState(false);
  const [inventory, setInventory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [haveSeached, setHaveSearched] = useState(false);
  const [haveFinished, setHaveFinished] = useState(true);

  const handleSearchInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchProducts = async (e) => {
    e.preventDefault();

    if (!search) {
      setErrorSearch(true);
      return;
    }

    setIsLoading(true);
    setHaveSearched(true);
    setInventory([]);
    setHaveFinished(false);

    try {
      const productsRes = await axios.get(
        `${url}/products?per_page=100&search=${search}`,
        {
          headers: {
            Authorization: basicAuth,
          },
        }
      );

      const products = await productsRes.data;
      const variationPromises = [];

      for (const product of products) {
        if (!product.variations.length) {
          setInventory((prev) => [
            ...prev,
            {
              id: product.id,
              sku: product.sku,
              name: product.name,
              categories: product.categories,
              img: product.images[0].src,
              price: product.sale_price
                ? coinFormat(product.sale_price)
                : coinFormat(product.regular_price),
              stock_quantity: product.stock_quantity,
            },
          ]);
        } else {
          const variationsRes = await axios.get(
            `${url}/products/${product.id}/variations`,
            {
              headers: {
                Authorization: basicAuth,
              },
            }
          );
          const { data } = variationsRes;
          data.map((variation) => {
            setInventory((prev) => [
              ...prev,
              {
                id: variation.id,
                sku: variation.sku,
                name: `${product.name} sabor ${variation.name}`,
                categories: product.categories,
                img: product.images[0].src,
                price: variation.sale_price
                  ? coinFormat(variation.sale_price)
                  : coinFormat(variation.regular_price),
                stock_quantity: variation.stock_quantity,
                img: product.images[0].src,
              },
            ]);
          });
          console.log(data);
        }
      }

      setHaveFinished(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Box
        display='flex'
        justifyContent='center'
        sx={{
          "& form": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "15px",
          },

          "& form button": {
            backgroundColor: "#3f51b5",
            minHeight: "52px",
            minWidth: "125px",
          },
        }}
      >
        <form>
          <TextField
            id='search'
            label='Buscar'
            variant='outlined'
            name='search'
            type='search'
            value={search}
            onChange={handleSearchInputChange}
            error={errorSearch}
            helperText={errorSearch && "Este campo es requerido"}
            required
          />
          <Button
            variant='contained'
            type='submit'
            onClick={handleSearchProducts}
          >
            Buscar
            <ContentPasteSearchIcon />
          </Button>
        </form>
      </Box>

      {isLoading && (
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          width='100%'
          height='10px'
          m='20px 0'
          sx={{
            "& .MuiLinearProgress-root": {
              width: "100%",
              height: "100%",
            },
          }}
        >
          <LinearProgress />
        </Box>
      )}

      {haveSeached && (
        <Box
          display='flex'
          m='20px 0'
          height='60vh'
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
            "& .MuiDataGrid-overlayWrapper": {
              minHeight: "120px !important",
            },
          }}
        >
          <DataGrid
            columns={productColumns}
            loading={isLoading}
            rows={!!inventory && inventory}
            components={{
              NoRowsOverlay: () => (
                <Stack
                  height='100%'
                  alignItems='center'
                  justifyContent='center'
                >
                  No se encontro un producto con este valor
                </Stack>
              ),
            }}
          />
        </Box>
      )}
    </Box>
  );
};
