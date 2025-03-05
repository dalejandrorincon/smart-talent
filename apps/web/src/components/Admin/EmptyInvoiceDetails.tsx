import { Box, Typography, Paper } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";

export const EmptyInvoiceDetails = () => {
  return (
    <Paper
      sx={{
        p: 6,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#03356b",
        color: "white",
        borderRadius: 1,
      }}
    >
      <Box sx={{ color: "rgba(255,255,255,0.3)", mb: 2 }}>
        <DescriptionIcon sx={{ fontSize: 64 }} />
      </Box>
      <Typography
        variant="h6"
        component="h3"
        sx={{ color: "rgba(255,255,255,0.7)" }}
      >
        Selecciona una factura para ver sus detalles
      </Typography>
    </Paper>
  );
};
