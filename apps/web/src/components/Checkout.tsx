// Ubicación: src/components/Checkout.tsx
import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { ShippingForm } from "./ShippingForm";
import { useInvoices } from "@store/productStore";
import { useCart } from "@store/productStore";
import { ShippingFormData } from "@types";

export const Checkout: React.FC = () => {
  const { cart } = useCart();
  const { generateInvoice } = useInvoices();
  const [invoiceGenerated, setInvoiceGenerated] = useState(false);

  const handleShippingSubmit = (shippingData: ShippingFormData) => {
    generateInvoice(shippingData);
    setInvoiceGenerated(true);
  };

  if (cart.length === 0) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h6" align="center" sx={{ mt: 4 }}>
          El carrito está vacío
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      {!invoiceGenerated ? (
        <>
          <Typography variant="h4" gutterBottom>
            Detalles del Carrito
          </Typography>
          <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
            <List>
              {cart.map((item) => (
                <ListItem key={item.id}>
                  <ListItemText
                    primary={item.name}
                    secondary={`Cantidad: ${item.quantity} - Precio: $${item.price}`}
                  />
                </ListItem>
              ))}
            </List>
            <Divider />
            <Typography variant="h6" align="right" sx={{ mt: 2 }}>
              Total: $
              {cart
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </Typography>
          </Paper>

          <Typography variant="h4" gutterBottom>
            Información de Envío
          </Typography>
          <ShippingForm onSubmit={handleShippingSubmit} />
        </>
      ) : (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            ¡Compra Realizada!
          </Typography>
          <Typography variant="body1">
            Tu factura ha sido generada exitosamente.
          </Typography>
        </Box>
      )}
    </Container>
  );
};
