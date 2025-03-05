import { Typography, Box, Divider } from "@mui/material";

interface InvoiceSummaryProps {
  subtotal: number;
  tax: number;
  total: number;
}

export const InvoiceSummary = ({
  subtotal,
  tax,
  total,
}: InvoiceSummaryProps) => {
  return (
    <>
      <Typography variant="h6" component="h4" gutterBottom>
        Resumen
      </Typography>
      <Divider sx={{ my: 1 }} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          py: 0.5,
        }}
      >
        <Typography variant="body2">Subtotal:</Typography>
        <Typography variant="body2">${subtotal.toLocaleString()}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          py: 0.5,
        }}
      >
        <Typography variant="body2">Impuestos:</Typography>
        <Typography variant="body2">${tax.toLocaleString()}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          py: 0.5,
        }}
      >
        <Typography variant="subtitle2" fontWeight="bold">
          Total:
        </Typography>
        <Typography variant="subtitle2" fontWeight="bold">
          ${total.toLocaleString()}
        </Typography>
      </Box>
    </>
  );
};
