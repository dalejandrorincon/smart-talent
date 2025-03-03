export interface ShippingFormData {
  name: string;
  email: string;
  phone: string;
  country: string;
}

export interface ShippingFormProps {
  onSubmit: (data: ShippingFormData) => void;
}
