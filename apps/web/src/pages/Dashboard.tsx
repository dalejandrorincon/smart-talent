import { useState, useEffect } from "react";
import { Typography, Container, Grid, Box } from "@mui/material";
import { useInvoices } from "@store/productStore";
import type { Invoice } from "@types";
import { InvoicesList, InvoiceDetails, EmptyInvoiceDetails } from "@components";

const Dashboard = () => {
  const { invoices } = useInvoices();
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  useEffect(() => {
    if (invoices.length > 0 && !selectedInvoice) {
      setSelectedInvoice(invoices[0]);
    }
  }, [invoices, selectedInvoice]);

  const sortedInvoices = [...invoices].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <Box>
      <Container maxWidth="xl">
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{
            mb: 4,
            color: "#03356b",
            fontWeight: "medium",
          }}
        >
          Panel de Administración
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={3}>
            <InvoicesList
              invoices={sortedInvoices}
              selectedInvoice={selectedInvoice}
              onSelectInvoice={setSelectedInvoice}
            />
          </Grid>

          <Grid item xs={12} md={8} lg={8}>
            {selectedInvoice ? (
              <InvoiceDetails invoice={selectedInvoice} />
            ) : (
              <EmptyInvoiceDetails />
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
