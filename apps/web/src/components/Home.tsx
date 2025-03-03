import React from "react";
import {
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ProductCategory } from "@types";

export const Home: React.FC = () => {
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
      <Typography variant="h3" gutterBottom>
        Smart Talent E-commerce
      </Typography>
      <Typography variant="h6" paragraph>
        Explora nuestros productos y realiza tus compras
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
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
                <Typography variant="h5" component="div">
                  {category}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

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
