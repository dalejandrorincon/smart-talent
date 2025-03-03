import React from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
import { useProductStore } from "@store/productStore";
import { useCart } from "@store/productStore";

export const ProductList: React.FC = () => {
  const { products } = useProductStore();
  const { addToCart } = useCart();

  return (
    <Grid container spacing={3}>
      {products
        .filter((product) => product.stock > 0)
        .map((product) => (
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
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => addToCart(product)}
                >
                  Agregar al Carrito
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
};
