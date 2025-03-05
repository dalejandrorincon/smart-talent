import { Typography, Divider } from "@mui/material";
import type { ShippingFormData } from "@types";

interface InvoiceCustomerInfoProps {
  shippingInfo: ShippingFormData;
}

export const InvoiceCustomerInfo = ({
  shippingInfo,
}: InvoiceCustomerInfoProps) => {
  return (
    <>
      <Typography variant="h6" component="h4" gutterBottom>
        Cliente
      </Typography>
      <Divider sx={{ my: 1 }} />

      <Typography variant="subtitle1">{shippingInfo.name}</Typography>
      <Typography variant="body2">{shippingInfo.email}</Typography>
      <Typography variant="body2">{shippingInfo.phone}</Typography>
      <Typography variant="body2">{shippingInfo.country}</Typography>
    </>
  );
};
