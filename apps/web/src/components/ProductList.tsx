import React from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
  Box,
  IconButton,
} from "@mui/material";
import { useProductStore } from "@store/productStore";
import { useCart } from "@store/productStore";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export const ProductList: React.FC = () => {
  const { products } = useProductStore();
  const { addToCart, cart, removeFromCart } = useCart();

  const getProductQuantityInCart = (productId: number) => {
    const cartItem = cart.find((item) => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <Grid container spacing={3}>
      {products
        .filter((product) => product.stock > 0)
        .map((product) => {
          const quantityInCart = getProductQuantityInCart(product.id);

          return (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="194"
                  image="https://placehold.co/300x200"
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Categoría: {product.category}
                  </Typography>
                  <Typography variant="body1" color="text.primary">
                    Precio: ${product.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Stock: {product.stock}
                  </Typography>
                </CardContent>
                <CardActions sx={{ minHeight: 56 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      px: 2,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {quantityInCart > 0 && (
                        <IconButton
                          color="primary"
                          disabled={quantityInCart === 0}
                          onClick={() => removeFromCart(product.id)}
                        >
                          <RemoveIcon />
                        </IconButton>
                      )}

                      {quantityInCart > 0 && (
                        <Typography sx={{ mx: 1 }}>{quantityInCart}</Typography>
                      )}
                      {product.stock === 0 || quantityInCart === 0 ? (
                        <Button
                          size="medium"
                          color="primary"
                          disabled={
                            product.stock === 0 ||
                            quantityInCart >= product.stock
                          }
                          onClick={() => addToCart(product)}
                        >
                          Agregar al carrito
                        </Button>
                      ) : (
                        <IconButton
                          color="primary"
                          disabled={
                            product.stock === 0 ||
                            quantityInCart >= product.stock
                          }
                          onClick={() => addToCart(product)}
                        >
                          <AddIcon />
                        </IconButton>
                      )}
                    </Box>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
    </Grid>
  );
};
