import React from "react";
import { Outlet, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  IconButton,
  Badge,
  Box,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "@store/productStore";

const navLinks = [
  { label: "Inicio", path: "/" },
  { label: "Productos", path: "/products" },
];

export const Layout: React.FC = () => {
  const { cart } = useCart();

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <AppBar position="static" sx={{ backgroundColor: "#03356b" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontFamily: "Poppins, sans-serif" }}
          >
            E-commerce
          </Typography>
          {navLinks.map(({ label, path }) => (
            <Button key={path} color="inherit" component={Link} to={path}>
              {label}
            </Button>
          ))}
          <IconButton color="inherit" component={Link} to="/checkout">
            <Badge badgeContent={cart.length} color="info">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
        <Outlet />
      </Container>

      <Box
        component="footer"
        sx={{
          position: "relative",
          bottom: 0,
          left: 0,
          width: "100%",
          backgroundColor: "#21232c",
          color: "white",
          textAlign: "center",
          p: 2,
        }}
      >
        © 2025 Diego Rincon
      </Box>
    </Box>
  );
};
