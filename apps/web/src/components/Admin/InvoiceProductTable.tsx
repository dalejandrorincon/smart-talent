import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import type { CartItem } from "@types";

interface InvoiceProductsTableProps {
  items: CartItem[];
}

export const InvoiceProductsTable = ({ items }: InvoiceProductsTableProps) => {
  return (
    <>
      <Typography variant="h6" component="h4" gutterBottom>
        Productos
      </Typography>
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ overflow: "hidden" }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#d5a050" }}>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "medium",
                  py: 1.5,
                }}
              >
                #
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "medium",
                  py: 1.5,
                }}
              >
                Producto
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  color: "white",
                  fontWeight: "medium",
                  py: 1.5,
                }}
              >
                Precio
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  color: "white",
                  fontWeight: "medium",
                  py: 1.5,
                }}
              >
                Cantidad
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  color: "white",
                  fontWeight: "medium",
                  py: 1.5,
                }}
              >
                Total
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, index) => (
              <TableRow
                key={item.id}
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                  "&:nth-of-type(odd)": {
                    bgcolor: "rgba(0, 0, 0, 0.02)",
                  },
                }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell align="right">
                  ${item.price.toLocaleString()}
                </TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">
                  ${(item.price * item.quantity).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3} />
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Total:
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                $
                {items
                  .reduce((sum, item) => sum + item.price * item.quantity, 0)
                  .toLocaleString()}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
