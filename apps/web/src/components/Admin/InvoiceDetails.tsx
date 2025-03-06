import { Box, Typography, Paper, Grid } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import {
  InvoiceCustomerInfo,
  InvoiceSummary,
  InvoiceProductsTable,
} from "@components";

import type { Invoice } from "@types";
import { Button } from "ui-library";

interface InvoiceDetailsProps {
  invoice: Invoice;
}

export const InvoiceDetails = ({ invoice }: InvoiceDetailsProps) => {
  return (
    <Paper sx={{ p: 3, borderRadius: 1, height: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Box>
          <Typography
            variant="h5"
            component="h3"
            gutterBottom
            sx={{ fontWeight: "medium", color: "#03356b" }}
          >
            Factura #{invoice.id.substring(0, 8)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {new Date(invoice.date).toLocaleString()}
          </Typography>
        </Box>
        <Button
          variant="text"
          startIcon={<PrintIcon />}
          onClick={() => window.print()}
          sx={{
            color: "#03356b",
          }}
        >
          Imprimir
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <InvoiceCustomerInfo shippingInfo={invoice.shippingInfo} />
        </Grid>
        <Grid item xs={12} md={6}>
          <InvoiceSummary
            subtotal={invoice.subtotal}
            tax={invoice.tax}
            total={invoice.total}
          />
        </Grid>
      </Grid>

      <InvoiceProductsTable items={invoice.items} />
    </Paper>
  );
};
