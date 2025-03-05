import React from "react";
import {
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ProductCategory } from "@types";

const Home: React.FC = () => {
  const categories = Object.values(ProductCategory);
  const categoryImages = {
    [ProductCategory.FRESH_FRUITS]: "https://placehold.co/300x200",
    [ProductCategory.CITRUS]: "https://placehold.co/300x200",
    [ProductCategory.TROPICAL]: "https://placehold.co/300x200",
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        mt: 8,
      }}
    >
      <Typography variant="h3" component="h2" sx={{ fontWeight: "bold" }}>
        EcoFruit Store
      </Typography>
      <Typography variant="h6" component="h3" gutterBottom>
        Explora nuestros productos y realiza tus compras
      </Typography>
      <Container maxWidth="lg">
        <Grid container spacing={3} sx={{ my: 2 }}>
          {categories.map((category) => (
            <Grid item xs={12} sm={4} key={category}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={categoryImages[category]}
                  alt={category}
                />
                <CardContent>
                  <Typography variant="h5" component="h4">
                    {category}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/products"
          size="large"
        >
          Ver Productos
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
