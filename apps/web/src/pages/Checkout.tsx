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
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { ShippingForm } from "../components/ShippingForm";
import { useInvoices } from "@store/productStore";
import { useCart } from "@store/productStore";
import { CartItem, ShippingFormData } from "@types";

const Checkout: React.FC = () => {
  const { cart, addToCart, removeFromCart } = useCart();
  const { generateInvoice } = useInvoices();
  const [lastCartItems, setLastCartItems] = useState<CartItem[]>([]);

  const handleShippingSubmit = (shippingData: ShippingFormData) => {
    setLastCartItems(cart);
    generateInvoice(shippingData);
  };

  if (cart.length === 0 && lastCartItems.length === 0) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h6" component="h2" align="center" sx={{ mt: 4 }}>
          El carrito está vacío
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{}}>
      <Paper elevation={3} sx={{ p: 4, width: "100%", borderRadius: 2 }}>
        {lastCartItems.length === 0 ? (
          <>
            <Typography variant="h4" component="h2" gutterBottom>
              Detalles del Carrito
            </Typography>
            <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
              <List>
                {cart.map((item) => (
                  <ListItem
                    key={item.id}
                    secondaryAction={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton
                          edge="end"
                          aria-label="remove"
                          onClick={() => removeFromCart(item.id)}
                          size="small"
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                        <IconButton
                          edge="end"
                          aria-label="add"
                          onClick={() => addToCart(item)}
                          disabled={item.quantity >= item.stock}
                          size="small"
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                    }
                  >
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
                {cart.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                )}
              </Typography>
            </Paper>

            <Typography variant="h4" component="h2" gutterBottom>
              Información de Envío
            </Typography>
            <ShippingForm onSubmit={handleShippingSubmit} />
          </>
        ) : (
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="h4" component="h2" gutterBottom>
              ¡Compra Realizada!
            </Typography>
            <List>
              {lastCartItems.map((item) => (
                <ListItem key={item.id}>
                  <ListItemText
                    primary={item.name}
                    secondary={`Cantidad: ${item.quantity} - Precio: $${item.price}`}
                  />
                </ListItem>
              ))}
            </List>
            <Typography variant="h6" align="center" sx={{ mt: 2 }}>
              Total: $
              {lastCartItems
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </Typography>
            <Typography variant="body1">
              Tu factura ha sido generada exitosamente.
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Checkout;
