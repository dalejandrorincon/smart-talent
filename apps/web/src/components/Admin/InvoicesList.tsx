import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
} from "@mui/material";
import { Invoice } from "@types";
import { useState } from "react";

interface InvoicesListProps {
  invoices: Invoice[];
  selectedInvoice: Invoice | null;
  onSelectInvoice: (invoice: Invoice) => void;
}

export const InvoicesList = ({
  invoices,
  selectedInvoice,
  onSelectInvoice,
}: InvoicesListProps) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(invoices.length / itemsPerPage);

  const currentInvoices = invoices.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);

    if (currentInvoices.length === 0 && value > 1) {
      setPage(value - 1);
      return;
    }
    if (
      selectedInvoice &&
      !currentInvoices.some((inv) => inv.id === selectedInvoice.id)
    ) {
      if (currentInvoices.length > 0) {
        onSelectInvoice(currentInvoices[0]);
      }
    }
  };
  return (
    <Paper
      sx={{
        height: "100%",
        bgcolor: "#1c3951",
        color: "white",
        borderRadius: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" component="h3" sx={{ color: "white" }}>
          Facturas ({invoices.length})
        </Typography>
      </Box>

      {invoices.length === 0 ? (
        <Box sx={{ p: 3, textAlign: "center" }}>
          <Typography component="h3" sx={{ color: "rgba(255,255,255,0.7)" }}>
            No hay facturas disponibles.
          </Typography>
        </Box>
      ) : (
        <>
          <TableContainer sx={{ flexGrow: 1 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: "white", bgcolor: "#1c3951" }}>
                    #
                  </TableCell>
                  <TableCell sx={{ color: "white", bgcolor: "#1c3951" }}>
                    Cliente
                  </TableCell>
                  <TableCell sx={{ color: "white", bgcolor: "#1c3951" }}>
                    Total
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentInvoices.map((invoice, index) => (
                  <TableRow
                    key={invoice.id}
                    selected={selectedInvoice?.id === invoice.id}
                    onClick={() => onSelectInvoice(invoice)}
                    sx={{
                      cursor: "pointer",
                      bgcolor: "#19354b",
                      "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
                    }}
                  >
                    <TableCell sx={{ color: "white", borderBottom: "none" }}>
                      {index + 1}
                    </TableCell>
                    <TableCell sx={{ color: "white", borderBottom: "none" }}>
                      {invoice.shippingInfo.name}
                    </TableCell>
                    <TableCell sx={{ color: "white", borderBottom: "none" }}>
                      ${invoice.total.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              py: 2,
              borderTop: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              size="small"
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "rgba(255,255,255,0.7)",
                },
                "& .MuiPaginationItem-root.Mui-selected": {
                  bgcolor: "rgba(255,255,255,0.2)",
                  color: "white",
                },
                "& .MuiPaginationItem-root:hover": {
                  bgcolor: "rgba(255,255,255,0.1)",
                },
              }}
            />
          </Box>
        </>
      )}
    </Paper>
  );
};
