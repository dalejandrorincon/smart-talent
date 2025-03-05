import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import {
  ShoppingCart as CartIcon,
  KeyboardArrowDown,
} from "@mui/icons-material";
import { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "@store/authStore";
import { useCart } from "@store/productStore";

export const Layout = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { cart } = useCart();
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static" sx={{ bgcolor: "#03356b" }}>
        <Toolbar>
          <Typography
            component="h1"
            variant="h6"
            sx={{
              flexGrow: 1,
              textDecoration: "none",
              color: "inherit",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            EcoFruit Store
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexWrap: "wrap",
              maxWidth: "100%",
              overflowX: "hidden",
            }}
          >
            {isAuthenticated ? (
              <>
                <Button
                  color="inherit"
                  onClick={handleMenu}
                  endIcon={<KeyboardArrowDown />}
                  sx={{
                    textTransform: "none",
                  }}
                >
                  {user?.email || "Usuario"}
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <MenuItem disabled>
                    <Typography variant="body2" color="text.secondary">
                      {user?.name}
                    </Typography>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/"
                  sx={{ display: { sm: "inline-flex" } }}
                >
                  Inicio
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/products"
                  sx={{ display: { xs: "none", sm: "inline-flex" } }}
                >
                  Productos
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/login"
                  sx={{ display: { xs: "none", sm: "inline-flex" } }}
                >
                  Iniciar Sesión
                </Button>
                <IconButton
                  color="inherit"
                  component={Link}
                  to="/checkout"
                  sx={{ mr: 2 }}
                >
                  <Badge badgeContent={cartItemCount} color="error">
                    <CartIcon />
                  </Badge>
                </IconButton>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1, my: 4 }}>
        <Outlet />
      </Box>

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
