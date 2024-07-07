import { Box, Button } from "@mui/material";
import { useState } from "react";

import {
  FormAddCustoModal,
  FormAddProductModal,
  FormAddPromoModal,
  FormAddShippingModal,
} from "../modals";
import Inventory2Icon from "@mui/icons-material/Inventory2";

export const ProductSelector = ({ order, setOrder, isEditingSale }) => {
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [isAddingShipping, setIsAddingShipping] = useState(false);
  const [isAddingPromo, setIsAddingPromo] = useState(false);

  const toggleIsAddingProduct = () => {
    setIsAddingProduct(!isAddingProduct);
    setIsAddingCustom(false);
    setIsAddingShipping(false);
    setIsAddingPromo(false);
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      gap='15px'
      m='15px 0'
    >
      <Box
        display='flex'
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent='center'
        gap='15px'
      >
        {!isEditingSale && (
          <>
            <FormAddProductModal order={order} setOrder={setOrder} />
            <FormAddCustoModal order={order} setOrder={setOrder} />
            <FormAddPromoModal order={order} setOrder={setOrder} />
          </>
        )}

        <FormAddShippingModal order={order} setOrder={setOrder} />
      </Box>
    </Box>
  );
};
