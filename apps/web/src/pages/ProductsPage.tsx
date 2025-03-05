import { ProductList } from "@components";
import { Box, Container, Typography } from "@mui/material";

const ProductsPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h3" component="h2" gutterBottom>
        Nuestros Productos
      </Typography>
      <Container maxWidth="lg" sx={{ my: 2 }}>
        <ProductList />
      </Container>
    </Box>
  );
};

export default ProductsPage;
