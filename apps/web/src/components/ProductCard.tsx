import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Box,
  IconButton,
} from "@mui/material";
import { useCart } from "@store/productStore";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button } from "ui-library";
import { Product } from "@types";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, cart, removeFromCart } = useCart();

  const getProductQuantityInCart = (productId: number) => {
    const cartItem = cart.find((item) => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  const quantityInCart = getProductQuantityInCart(product.id);

  return (
    <Card>
      <CardMedia
        component="img"
        height="194"
        image="https://placehold.co/300x200"
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h5" component="h3">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Categoría: {product.category}
        </Typography>
        <Typography variant="body1" color="text.primary">
          Precio: ${product.price.toLocaleString()}
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
                aria-label="Disminuir cantidad"
              >
                <RemoveIcon />
              </IconButton>
            )}

            {quantityInCart > 0 && (
              <Typography sx={{ mx: 1 }}>{quantityInCart}</Typography>
            )}
            {product.stock === 0 || quantityInCart === 0 ? (
              <Button
                variant="text"
                disabled={
                  product.stock === 0 || quantityInCart >= product.stock
                }
                onClick={() => addToCart(product)}
                aria-label="Agregar al carrito"
              >
                Agregar al carrito
              </Button>
            ) : (
              <IconButton
                color="primary"
                disabled={
                  product.stock === 0 || quantityInCart >= product.stock
                }
                onClick={() => addToCart(product)}
                aria-label="Incrementar cantidad"
              >
                <AddIcon />
              </IconButton>
            )}
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
};
