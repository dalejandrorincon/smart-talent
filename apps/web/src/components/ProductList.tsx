import { Grid } from "@mui/material";
import { useProductStore } from "@store/productStore";
import { ProductCard } from "@components";

export const ProductList: React.FC = () => {
  const { products } = useProductStore();

  return (
    <Grid container spacing={3}>
      {products
        .filter((product) => product.stock > 0)
        .map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
    </Grid>
  );
};
